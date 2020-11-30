import React, { useState, useEffect, useContext, useCallback } from 'react';
import Select from 'react-select';
import './commonIngredients.css';
import {
  getSessionIngredientsRef,
  getIngredient,
} from '../../services/database';
import { useSession } from '../../hooks/useSession';
import { MixologistsContext } from '../../context/MixologistsContext';
import { ApplicationContext } from '../../context/ApplicationContext';
import Ingredient from '../ingredient/ingredient';
import { useMixologistOptions } from '../../hooks/useMixologistOptions';

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
          <Ingredient
            key={index}
            ingredient={ingredient}
            showMissing
          ></Ingredient>
        ))}
    </ul>
  );
};

const CommonIngredients = () => {
  const {
    constants: { CATEGORIES },
  } = useContext(ApplicationContext);
  const [commonIngredientKeys, setCommonIngredientKeys] = useState([]);
  const [commonIngredients, setCommonIngredients] = useState([]);
  const sessionMixologists = useContext(MixologistsContext);
  const [threshold, setThreshold] = useState(sessionMixologists.length);
  const { session } = useSession();
  const thresholdOptions = useMixologistOptions(
    1,
    sessionMixologists.length
  ).sort((a, b) => b.value - a.value);
  const getThresholdOptionValue = useCallback(option => option.value, []);
  const handleThresholdChange = ({ value }) => setThreshold(value);

  useEffect(() => {
    const sessionIngredientsRef = getSessionIngredientsRef(session);

    sessionIngredientsRef.on('value', sessionIngredientsSnap => {
      let updateCommonIngredientKeys = [];

      sessionIngredientsSnap.forEach(ingredientSnap => {
        const mixologists = ingredientSnap.child('mixologists').val();
        console.log('All mixologist count: ', sessionMixologists.length);
        console.log(
          'mixologist with ingredient: ',
          Object.keys(mixologists).length
        );
        console.log('threshold: ', threshold);
        if (mixologists && Object.keys(mixologists).length >= threshold) {
          updateCommonIngredientKeys.push(ingredientSnap.key);
        }
      });
      setCommonIngredientKeys(updateCommonIngredientKeys);
    });
    return () => sessionIngredientsRef.off();
  }, [sessionMixologists, session, threshold]);

  // TODO: Can this be extracted out to a useIngredients hook? Duplicate functionality in useMixologist
  useEffect(() => {
    if (commonIngredientKeys.length) {
      Promise.all(
        commonIngredientKeys.map(ingredientKey => getIngredient(ingredientKey))
      ).then(data =>
        setCommonIngredients(data.map(ingredient => ingredient.val()))
      );
    } else {
      setCommonIngredients([]);
    }
  }, [commonIngredientKeys]);

  return (
    // TODO: Refactor to iterate over object of categories
    <article className="common-ingredients">
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
      <Select
        className="threshold-select"
        placeholder="Mixologist threshold"
        defaultValue={thresholdOptions[0]}
        options={thresholdOptions}
        getOptionValue={getThresholdOptionValue}
        getOptionLabel={getThresholdOptionValue}
        onChange={handleThresholdChange}
      ></Select>
      <p>
        Change this to select how many mixologists need to have an ingredient
        before it is shown above. Mixologists missing an ingredient are
        displayed in red.
      </p>
    </article>
  );
};

export default CommonIngredients;
