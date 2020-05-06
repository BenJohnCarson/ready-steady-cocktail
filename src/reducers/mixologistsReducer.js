export const SET_MIXOLOGISTS = "SET_MIXOLOGISTS";
export const SET_NAME = "SET_NAME";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export const mixologistsReducer = (mixologists, action) => {
  switch (action.type) {
    case SET_MIXOLOGISTS: {
      return setMixologists(action.payload);
    }
    case SET_NAME: {
      return setName(action.payload, mixologists);
    }
    case ADD_INGREDIENT: {
      return addIngredient(action.payload, mixologists);
    }
    case REMOVE_INGREDIENT: {
      return removeIngredient(action.payload, mixologists);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function setMixologists(count) {
  const mixologists = [];

  for (let i = 0; i < count; i++) {
    mixologists.push({
      id: i,
      name: "",
      ingredients: [],
    });
  }
  return mixologists;
}

function setName({ id, name }, mixologists) {
  return mixologists.map(mixologist =>
    mixologist.id === id ? { ...mixologist, name } : mixologist
  );
}

function addIngredient({ id, ingredient: selectedIngredient }, mixologists) {
  return mixologists.map(mixologist => {
    if (mixologist.id === id) {
      return mixologist.ingredients.find(
        ingredient => ingredient.name === selectedIngredient.name
      )
        ? mixologist
        : {
            ...mixologist,
            ingredients: [...mixologist.ingredients, { ...selectedIngredient }],
          };
    } else {
      return mixologist;
    }
  });
}

function removeIngredient({ id, ingredient: selectedIngredient }, mixologists) {
  return mixologists.map(mixologist => {
    if (mixologist.id === id) {
      return {
        ...mixologist,
        ingredients: [
          ...mixologist.ingredients.filter(
            ingredient => ingredient.name !== selectedIngredient.name
          ),
        ],
      };
    } else {
      return mixologist;
    }
  });
}
