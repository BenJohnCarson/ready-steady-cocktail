import firebase from '../services/firebase';

const { db } = firebase;

export const postSession = mixologistsCount => {
  const newSessionKey = db.ref('/sessions').push().key;
  const sessionData = {};

  for (let i = 0; i < mixologistsCount; i++) {
    const newMixologistKey = db.ref('/mixologists').push().key;

    db.ref(`/mixologists/${newMixologistKey}`).set({ name: '' });
    sessionData[`/mixologists/${newMixologistKey}`] = true;
  }
  db.ref(`/sessions/${newSessionKey}`).update(sessionData);

  return newSessionKey;
};

export const getSessionIngredientsRef = session =>
  db.ref(`/sessions/${session}/ingredients`);

export const getSessionIngredientMixologistsRef = ({ session, ingredient }) =>
  db.ref(`/sessions/${session}/ingredients/${ingredient.id}/mixologists`);

export const getIngredient = async id =>
  await db.ref(`/ingredients/${id}`).once('value');

export const getMixologists = async session => {
  const dbMixologists = [];
  const mixologistsSnap = await db
    .ref(`/sessions/${session}/mixologists`)
    .once('value');

  mixologistsSnap.forEach(mixologistSnap => {
    dbMixologists.push(mixologistSnap.key);
  });

  return dbMixologists;
};

export const getMixologistRef = id => db.ref(`/mixologists/${id}`);

export const getMixologist = async id =>
  await getMixologistRef(id).once('value');

export const mixologistSetName = ({ name, id }) => {
  db.ref(`/mixologists/${id}`).update({
    name,
  });
};

export const mixologistAddIngredient = ({ ingredient, session, id }) => {
  db.ref(`/sessions/${session}/ingredients/${ingredient.id}`).update({
    [`/mixologists/${id}`]: true,
  });
  db.ref(`/mixologists/${id}`).update({
    [`/ingredients/${ingredient.id}`]: true,
  });
};

export const mixologistRemoveIngredient = ({ ingredient, session, id }) => {
  db.ref(`/sessions/${session}/ingredients/${ingredient}`).update({
    [`/mixologists/${id}`]: null,
  });
  db.ref(`/mixologists/${id}`).update({
    [`/ingredients/${ingredient}`]: null,
  });
};

// Leaving this here for now incase I accidentally empty the DB
// export const addIngredientsList = ({ingredients}) => {
//   ingredients.forEach(ingredient => {
//     db.ref(`/ingredients/${ingredient.id}`).update(ingredient)
//   })
// }
