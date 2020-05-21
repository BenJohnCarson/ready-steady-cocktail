import React, { useState, useEffect, useContext } from "react";
import firebase from "../../services/firebase";
import { useSession } from "../../hooks/useSession";
import { MixologistsContext } from "../../context/MixologistsContext";
import Ingredient from "../ingredient/ingredient";

const CommonIngredients = () => {
  const [commonIngredients, setCommonIngredients] = useState([]);
  const { session } = useSession();
  const sessionMixologists = useContext(MixologistsContext);

  useEffect(() => {
    const sessionIngredientsRef = firebase.db.ref(
      `/sessions/${session}/ingredients`
    );

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
