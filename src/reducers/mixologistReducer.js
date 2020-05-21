import {
  mixologistAddIngredient,
  mixologistRemoveIngredient,
  mixologistSetName,
} from '../services/database';

export const SET_MIXOLOGIST = 'SET_MIXOLOGIST';
export const SET_NAME = 'SET_NAME';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const mixologistReducer = (mixologist, action) => {
  switch (action.type) {
    case SET_MIXOLOGIST: {
      return setMixologist(action);
    }
    case SET_NAME: {
      return setName(action, mixologist.id);
    }
    case ADD_INGREDIENT: {
      return addIngredient(action, mixologist.id);
    }
    case REMOVE_INGREDIENT: {
      return removeIngredient(action, mixologist.id);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function setMixologist({ mixologist, id }) {
  return { ...mixologist, id };
}

function setName({ name }, id) {
  mixologistSetName({ name, id });
}

function addIngredient({ ingredient, session }, id) {
  mixologistAddIngredient({ ingredient, session, id });
}

function removeIngredient({ ingredient, session }, id) {
  mixologistRemoveIngredient({ ingredient, session, id });
}
