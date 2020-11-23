import { useEffect, useState } from 'react';
import {
  getIngredient,
  getMixologistRef,
  mixologistAddIngredient,
  mixologistRemoveIngredient,
  mixologistSetName,
} from '../services/database';
import { useSession } from './useSession';

export const useMixologist = (id, defaultState = {}) => {
  const { session } = useSession();
  const [mixologist, setMixologist] = useState(defaultState);
  const [ingredients, setIngredients] = useState([]);

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

  // TODO: Can this be extracted out to a useIngredients hook? Duplicate functionality in commonIngredients
  useEffect(() => {
    const getIngredients = async () => {
      const ingredientKeys =
        mixologist.ingredients && Object.keys(mixologist.ingredients);

      if (ingredientKeys && ingredientKeys.length) {
        const ingredientSnaps = await Promise.all(
          ingredientKeys.map(ingredientKey => getIngredient(ingredientKey))
        );

        return ingredientSnaps.map(ingredient => ingredient.val());
      }
      return [];
    };

    getIngredients().then(ingredientsResponse =>
      setIngredients(ingredientsResponse)
    );
  }, [mixologist.ingredients]);

  return {
    mixologist,
    addIngredient,
    removeIngredient,
    setName,
    ingredients,
  };
};
