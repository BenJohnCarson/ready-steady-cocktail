export const SET_MIXOLOGISTS = "SET_MIXOLOGISTS";
export const SET_MIXOLOGIST = "SET_MIXOLOGIST";

export const mixologistsReducer = (state, action) => {
  switch (action.type) {
    case SET_MIXOLOGISTS: {
      return setMixologists(action.payload)
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function setMixologists(count) {
  const mixologists = [];

  for(let i = 0; i < count; i++) {
    mixologists.push({
      id: i
    });
  }
  return { mixologists };
}