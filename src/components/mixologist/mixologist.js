import React from "react";
import "./mixologist.css";
import IngredientSearch from "../ingredientSearch/ingredientSearch";
import { useMixologistsDispatch } from "../../context/MixologistsContext";
import { ADD_INGREDIENT } from "../../reducers/mixologistsReducer";

const Mixologist = ({ mixologist }) => {
  const dispatch = useMixologistsDispatch();
  const addIngredient = ingredient => {
    dispatch({
      type: ADD_INGREDIENT,
      payload: { id: mixologist.id, ingredient },
    });
  };

  return (
    <article className="mixologist">
      <input className="name" placeholder="Enter a name"></input>
      <IngredientSearch addIngredient={addIngredient}></IngredientSearch>
      <ul className="ingredient-list">
        {mixologist.ingredients.map((ingredient, index) => (
          <li key={index} className="ingredient">
            {ingredient.name}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Mixologist;
