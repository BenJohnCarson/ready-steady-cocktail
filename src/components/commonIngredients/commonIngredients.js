import React, { useState, useEffect, useCallback } from "react";
import { useMixologistsState } from "../../context/MixologistsContext";
import Ingredient from "../ingredient/ingredient";

const CommonIngredients = () => {
  const { mixologists } = useMixologistsState();
  const [commonIngredients, setCommonIngredients] = useState([]);
  const intersectMixologists = useCallback(allMixologistIngredients => {
    return allMixologistIngredients[0].filter(ingredient => {
      return allMixologistIngredients
        .slice(1)
        .every(a => !!a.filter(i => i.name === ingredient.name).length);
    });
  }, []);

  useEffect(() => {
    let allMixologistIngredients = [];

    mixologists.forEach(mixologist => {
      allMixologistIngredients = [
        ...allMixologistIngredients,
        mixologist.ingredients,
      ];
    });
    if (allMixologistIngredients[0]) {
      setCommonIngredients(intersectMixologists(allMixologistIngredients));
    }
  }, [mixologists, intersectMixologists]);

  return (
    <article>
      <h3>Common Ingredients</h3>
      {commonIngredients.map((ingredient, index) => (
        <Ingredient key={index} ingredient={ingredient}></Ingredient>
      ))}
    </article>
  );
};

export default CommonIngredients;
