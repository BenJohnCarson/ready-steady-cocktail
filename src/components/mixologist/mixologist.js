import React from "react";
import "./mixologist.css";
import { useMixologistsDispatch } from "../../context/MixologistsContext";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../../reducers/mixologistsReducer";
import IngredientSearch from "../ingredientSearch/ingredientSearch";
import Ingredient from "../ingredient/ingredient";

const Mixologist = ({ mixologist }) => {
  const dispatch = useMixologistsDispatch();
  const addIngredient = ingredient => {
    dispatch({
      type: ADD_INGREDIENT,
      payload: { mixologist, ingredient },
    });
  };
  const removeIngredient = ingredient => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: { mixologist, ingredient },
    });
  };

  return (
    <article className="mixologist">
      <input className="name" placeholder="Enter a name"></input>
      <IngredientSearch
        addIngredient={addIngredient}
        ingredients={mixologist.ingredients}
      ></IngredientSearch>
      <ul className="ingredient-list">
        {mixologist.ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
            ingredient={ingredient}
            removeIngredient={removeIngredient}
          >
            <button onClick={() => removeIngredient(ingredient)}>X</button>
          </Ingredient>
        ))}
      </ul>
    </article>
  );
};

export default Mixologist;
