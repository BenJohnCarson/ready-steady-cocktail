import React, { useState, useEffect } from 'react';
import './mixologist.css';
import IngredientSearch from '../ingredientSearch/ingredientSearch';
import Ingredient from '../ingredient/ingredient';
import firebase from '../../services/firebase';
import { useSession } from '../../hooks/useSession';

const Mixologist = ({ id }) => {
  const [mixologist, setMixologist] = useState({});
  const { session } = useSession();

  const addIngredient = ingredient => {
    firebase.db.ref(`/sessions/${session}/ingredients/${ingredient}`).update({
      [`/mixologists/${id}`]: true,
    });
    firebase.db.ref(`/mixologists/${id}`).update({
      [`/ingredients/${ingredient}`]: true,
    });
  };
  const removeIngredient = ingredient => {
    firebase.db.ref(`/sessions/${session}/ingredients/${ingredient}`).update({
      [`/mixologists/${id}`]: null,
    });
    firebase.db.ref(`/mixologists/${id}`).update({
      [`/ingredients/${ingredient}`]: null,
    });
  };
  const setName = ({ target: { value: name } }) => {
    return firebase.db.ref(`/mixologists/${id}`).update({
      name,
    });
  };

  useEffect(() => {
    const mixologistRef = firebase.db.ref(`/mixologists/${id}`);

    mixologistRef.on('value', mixologistSnap => {
      setMixologist(mixologistSnap.val());
    });
    return () => mixologistRef.off();
  }, [id]);

  return (
    <article className="mixologist">
      <input
        className="mixologist__name"
        placeholder="Enter a name"
        onBlur={setName}
        defaultValue={mixologist.name}
      ></input>
      <IngredientSearch
        className="mixologist__ingredient-search"
        addIngredient={addIngredient}
      ></IngredientSearch>
      <ul className="mixologist__ingredient-list">
        {mixologist.ingredients &&
          Object.keys(mixologist.ingredients).map((ingredient, index) => (
            <Ingredient key={index} ingredient={ingredient}>
              <button onClick={() => removeIngredient(ingredient)}>X</button>
            </Ingredient>
          ))}
      </ul>
    </article>
  );
};

export default Mixologist;
