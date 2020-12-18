import React from 'react';
import classNames from 'classnames';
import './ingredient.css';

const Ingredient = ({ ingredient, children, className }) => {
  const ingredientClass = classNames('ingredient', className);

  return (
    <li className={ingredientClass}>
      {ingredient.title}
      {children}
    </li>
  );
};

export default Ingredient;
