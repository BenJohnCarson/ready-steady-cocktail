import React, { useState, useEffect, useContext } from 'react';
import { COMMON_INGREDIENTS_THRESHOLD } from '../../constants';
import { getIngredientsRef } from '../../services/database';
import { useSession } from '../../hooks/useSession';
import { MixologistsContext } from '../../context/MixologistsContext';
import Ingredient from '../ingredient/ingredient';

const CommonIngredients = () => {
  const [commonIngredients, setCommonIngredients] = useState([]);
  const { session } = useSession();
  const sessionMixologists = useContext(MixologistsContext);

  useEffect(() => {
    const ingredientsRef = getIngredientsRef(session);

    ingredientsRef.on('value', sessionIngredientsSnap => {
      let updateCommonIngredients = [];

      sessionIngredientsSnap.forEach(ingredientSnap => {
        const mixologists = ingredientSnap.child('mixologists').val();
        if (
          mixologists &&
          Object.keys(mixologists).length ===
            sessionMixologists.length - COMMON_INGREDIENTS_THRESHOLD
        ) {
          // Checking against length here needs to be changed to matching IDs
          updateCommonIngredients.push(ingredientSnap.key);
        }
      });
      setCommonIngredients(updateCommonIngredients);
    });
    return () => ingredientsRef.off();
  }, [sessionMixologists, session]);

  return (
    <article>
      <h3>Shared Ingredients</h3>
      {commonIngredients.map((ingredient, index) => (
        <Ingredient key={index} ingredient={ingredient}></Ingredient>
      ))}
    </article>
  );
};

export default CommonIngredients;
