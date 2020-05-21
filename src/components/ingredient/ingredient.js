import React from 'react';
import './ingredient.css';

const Ingredient = ({ ingredient, children }) => (
  <li className="ingredient">
    {ingredient}
    {children}
  </li>
);

export default Ingredient;
