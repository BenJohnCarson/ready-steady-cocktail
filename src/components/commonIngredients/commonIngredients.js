import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  useMixologistsState,
  MixologistsContext,
} from "../../context/MixologistsContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import Ingredient from "../ingredient/ingredient";
import { db } from "../../services/firebase";

const CommonIngredients = () => {
  // const mixologists = useMixologistsState();
  const [commonIngredients, setCommonIngredients] = useState([]);
  const { session } = useContext(ApplicationContext);
  const sessionMixologists = useContext(MixologistsContext);
  // const intersectMixologists = useCallback(allMixologistIngredients => {
  //   return allMixologistIngredients[0].filter(ingredient => {
  //     return allMixologistIngredients
  //       .slice(1)
  //       .every(a => !!a.filter(i => i.name === ingredient.name).length);
  //   });
  // }, []);

  // useEffect(() => {
  //   let allMixologistIngredients = [];

  //   mixologists.forEach(mixologist => {
  //     allMixologistIngredients = [
  //       ...allMixologistIngredients,
  //       mixologist.ingredients,
  //     ];
  //   });
  //   if (allMixologistIngredients[0]) {
  //     setCommonIngredients(intersectMixologists(allMixologistIngredients));
  //   }
  // }, [mixologists, intersectMixologists]);

  useEffect(() => {
    const sessionIngredientsRef = db.ref(`/sessions/${session}/ingredients`);

    sessionIngredientsRef.on("value", sessionIngredientsSnap => {
      let updateCommonIngredients = [];

      sessionIngredientsSnap.forEach(ingredientSnap => {
        const mixologists = ingredientSnap.child("mixologists").val();

        if (
          mixologists &&
          Object.keys(mixologists).length === sessionMixologists.length
        ) {
          // Checking against length here needs to be changed to matching IDs
          updateCommonIngredients.push(ingredientSnap.key);
        }
      });
      setCommonIngredients(updateCommonIngredients);
    });
    return () => sessionIngredientsRef.off();
  }, []);

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
