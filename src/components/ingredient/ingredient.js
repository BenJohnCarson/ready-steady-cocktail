import React from "react";
import "./ingredient.css";

const Ingredient = ({ ingredient, children }) => (
  <li className="ingredient">
    {ingredient.name}
    {children}
  </li>
);

export default Ingredient;
