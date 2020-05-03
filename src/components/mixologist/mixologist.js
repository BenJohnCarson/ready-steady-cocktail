import React from "react";
import "./mixologist.css";
import IngredientSearch from "../ingredientSearch/ingredientSearch";

const Mixologist = () => {
  const addIngredient = ingredient => {};

  return (
    <article className="mixologist">
      <input className="name" placeholder="Enter a name"></input>
      <IngredientSearch addIngredient={addIngredient}></IngredientSearch>
      <ul className="ingredient-list">
        <li className="ingredient">Vodka</li>
      </ul>
    </article>
  );
};

export default Mixologist;
