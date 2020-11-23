import React, { useState, useEffect, useContext } from 'react';
import { getIngredientsRef, getIngredient } from '../../services/database';
import { useSession } from '../../hooks/useSession';
import { MixologistsContext } from '../../context/MixologistsContext';
import { ApplicationContext } from '../../context/ApplicationContext';
import Ingredient from '../ingredient/ingredient';

// TODO: This should probably live in it's own file
const CategoryIngredientsList = ({
  commonIngredients,
  categoryId,
  children,
}) => {
  if (
    !commonIngredients.some(ingredient => ingredient.categoryId === categoryId)
  ) {
    return '';
  }
  return (
    <ul>
      {children}
      {commonIngredients
        .filter(ingredient => ingredient.categoryId === categoryId)
        .map((ingredient, index) => (
          <Ingredient key={index} ingredient={ingredient}></Ingredient>
        ))}
    </ul>
  );
};

const CommonIngredients = () => {
  const [commonIngredientKeys, setCommonIngredientKeys] = useState([]);
  const [commonIngredients, setCommonIngredients] = useState([]);
  const { session } = useSession();
  const sessionMixologists = useContext(MixologistsContext);
  const {
    constants: { COMMON_INGREDIENTS_THRESHOLD, CATEGORIES },
  } = useContext(ApplicationContext);

  useEffect(() => {
    const ingredientsRef = getIngredientsRef(session);

    ingredientsRef.on('value', sessionIngredientsSnap => {
      let updateCommonIngredientKeys = [];

      sessionIngredientsSnap.forEach(ingredientSnap => {
        const mixologists = ingredientSnap.child('mixologists').val();
        if (
          mixologists &&
          // TODO: Checking against length here needs to be changed to matching IDs
          Object.keys(mixologists).length ===
            sessionMixologists.length - COMMON_INGREDIENTS_THRESHOLD
        ) {
          updateCommonIngredientKeys.push(ingredientSnap.key);
        }
      });
      setCommonIngredientKeys(updateCommonIngredientKeys);
    });
    return () => ingredientsRef.off();
  }, [sessionMixologists, session, COMMON_INGREDIENTS_THRESHOLD]);

  // TODO: Can this be extracted out to a useIngredients hook? Duplicate functionality in useMixologist
  useEffect(() => {
    if (commonIngredientKeys.length) {
      Promise.all(
        commonIngredientKeys.map(ingredientKey => getIngredient(ingredientKey))
      ).then(data => {
        setCommonIngredients(data.map(ingredient => ingredient.val()));
      });
    }
  }, [commonIngredientKeys]);

  return (
    <article>
      <h3>Shared Ingredients</h3>
      <CategoryIngredientsList
        commonIngredients={commonIngredients}
        categoryId={CATEGORIES.SPIRITS}
      >
        <h4>Spirits</h4>
      </CategoryIngredientsList>
      <CategoryIngredientsList
        commonIngredients={commonIngredients}
        categoryId={CATEGORIES.LIQUEURS}
      >
        <h4>Liqueurs</h4>
      </CategoryIngredientsList>
      <CategoryIngredientsList
        commonIngredients={commonIngredients}
        categoryId={CATEGORIES.WINE}
      >
        <h4>Wine</h4>
      </CategoryIngredientsList>
      <CategoryIngredientsList
        commonIngredients={commonIngredients}
        categoryId={CATEGORIES.BEERS_AND_CIDERS}
      >
        <h4>Beers &amp; Ciders</h4>
      </CategoryIngredientsList>
      <CategoryIngredientsList
        commonIngredients={commonIngredients}
        categoryId={CATEGORIES.MIXERS}
      >
        <h4>Mixers</h4>
      </CategoryIngredientsList>
      <CategoryIngredientsList
        commonIngredients={commonIngredients}
        categoryId={CATEGORIES.OTHERS}
      >
        <h4>Others</h4>
      </CategoryIngredientsList>
    </article>
  );
};

export default CommonIngredients;
