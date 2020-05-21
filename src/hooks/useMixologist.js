import { useReducer, useEffect } from 'react';
import {
  mixologistReducer,
  SET_MIXOLOGIST,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_NAME,
} from '../reducers/mixologistReducer';
import { getMixologistRef } from '../services/database';
import { useSession } from './useSession';

export const useMixologist = (id, defaultState = {}) => {
  const { session } = useSession();
  const [mixologist, dispatch] = useReducer(mixologistReducer, defaultState);

  const addIngredient = ingredient =>
    dispatch({ type: ADD_INGREDIENT, ingredient, session });
  const removeIngredient = ingredient =>
    dispatch({ type: REMOVE_INGREDIENT, ingredient, session });
  const setName = name => dispatch({ type: SET_NAME, name });

  useEffect(() => {
    const mixologistRef = getMixologistRef(id);

    mixologistRef.on('value', mixologistSnap => {
      console.log('new val: ', mixologistSnap.val());
      dispatch({ type: SET_MIXOLOGIST, mixologist: mixologistSnap.val(), id });
    });
    return () => mixologistRef.off();
  }, [id]);
  console.log(mixologist);
  return {
    mixologist,
    addIngredient,
    removeIngredient,
    setName,
  };
};
