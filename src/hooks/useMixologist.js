import { useEffect, useState } from 'react';
import {
  getMixologistRef,
  mixologistAddIngredient,
  mixologistRemoveIngredient,
  mixologistSetName,
} from '../services/database';
import { useSession } from './useSession';

export const useMixologist = (id, defaultState = {}) => {
  const { session } = useSession();
  const [mixologist, setMixologist] = useState(defaultState);

  const addIngredient = ingredient =>
    mixologistAddIngredient({ ingredient, session, id });
  const removeIngredient = ingredient =>
    mixologistRemoveIngredient({ ingredient, session, id });
  const setName = name => mixologistSetName({ name, id });

  useEffect(() => {
    const mixologistRef = getMixologistRef(id);

    mixologistRef.on('value', mixologistSnap =>
      setMixologist(mixologistSnap.val())
    );

    return () => mixologistRef.off();
  }, [id]);

  return {
    mixologist,
    addIngredient,
    removeIngredient,
    setName,
  };
};
