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
    ingredients,
  } = useMixologist(id);
  const handleOnBlur = ({ target: { value: name } }) => {
    setName(name);
  };

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
        {!!ingredients.length &&
          ingredients
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((ingredient, index) => (
              <Ingredient key={index} ingredient={ingredient}>
                <button onClick={() => removeIngredient(ingredient.id)}>
                  X
                </button>
              </Ingredient>
            ))}
      </ul>
    </article>
  );
};

export default Mixologist;
