export const SET_MIXOLOGISTS = "SET_MIXOLOGISTS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export const mixologistsReducer = (state, action) => {
  switch (action.type) {
    case SET_MIXOLOGISTS: {
      return setMixologists(action.payload);
    }
    case ADD_INGREDIENT: {
      return addIngredient(action.payload, state);
    }
    case REMOVE_INGREDIENT: {
      return removeIngredient(action.payload, state);
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
      ingredients: [],
    });
  }
  return { mixologists };
}

function addIngredient({ mixologist, ingredient: selectedIngredient }, state) {
  if (
    mixologist.ingredients.find(
      ingredient => ingredient.name === selectedIngredient.name
    )
  ) {
    return state;
  }
  const updatedMixologist = {
    ...mixologist,
    ingredients: [...mixologist.ingredients, { ...selectedIngredient }],
  };

  return updateAndSortMixologists(updatedMixologist, state);
}

function removeIngredient(
  { mixologist, ingredient: selectedIngredient },
  state
) {
  const updatedMixologist = {
    ...mixologist,
    ingredients: [
      ...mixologist.ingredients.filter(
        ingredient => ingredient.name !== selectedIngredient.name
      ),
    ],
  };

  return updateAndSortMixologists(updatedMixologist, state);
}

function updateAndSortMixologists(updatedMixologist, state) {
  const updatedMixologistList = [
    updatedMixologist,
    ...state.mixologists.filter(
      mixologist => mixologist.id !== updatedMixologist.id
    ),
  ];

  updatedMixologistList.sort((a, b) => a.id - b.id);

  return { ...state, mixologists: updatedMixologistList };
}
