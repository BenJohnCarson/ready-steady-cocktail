import React from 'react';
import './mixologist.css';
import IngredientSearch from '../ingredientSearch/ingredientSearch';
import Ingredient from '../ingredient/ingredient';
import { useMixologist } from '../../hooks/useMixologist';

const Mixologist = ({ id }) => {
  const {
    mixologist,
    addIngredient,
    removeIngredient,
    setName,
  } = useMixologist(id);

  const handleOnBlur = ({ target: { value: name } }) => {
    setName(name);
  };

  console.log(mixologist.ingredients);
  return (
    <article className="mixologist">
      <input
        className="mixologist__name"
        placeholder="Enter a name"
        onBlur={handleOnBlur}
        defaultValue={mixologist.name}
      ></input>
      <IngredientSearch
        className="mixologist__ingredient-search"
        addIngredient={addIngredient}
      ></IngredientSearch>
      <ul className="mixologist__ingredient-list">
        {mixologist.ingredients &&
          Object.keys(mixologist.ingredients).map((ingredient, index) => (
            <Ingredient key={index} ingredient={ingredient}>
              <button onClick={() => removeIngredient(ingredient)}>X</button>
            </Ingredient>
          ))}
      </ul>
    </article>
  );
};

export default Mixologist;
