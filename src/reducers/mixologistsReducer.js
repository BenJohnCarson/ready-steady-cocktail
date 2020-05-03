export const SET_MIXOLOGISTS = "SET_MIXOLOGISTS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const mixologistsReducer = (state, action) => {
  switch (action.type) {
    case SET_MIXOLOGISTS: {
      return setMixologists(action.payload);
    }
    case ADD_INGREDIENT: {
      return addIngredient(action.payload, state);
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

function addIngredient(payload, state) {
  const { id, ingredient } = payload;
  const mixologist = state.mixologists.find(mixologist => mixologist.id === id);
  const updatedMixologist = {
    ...mixologist,
    ingredients: [...mixologist.ingredients, ingredient],
  };
  const updatedMixologistList = [
    updatedMixologist,
    ...state.mixologists.filter(mixologist => mixologist.id !== id),
  ];

  updatedMixologistList.sort((a, b) => a.id - b.id);

  return { ...state, mixologists: updatedMixologistList };
}
