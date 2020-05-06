import React, { useCallback } from "react";
import "./mixologist.css";
import { useMixologistsDispatch } from "../../context/MixologistsContext";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_NAME,
} from "../../reducers/mixologistsReducer";
import IngredientSearch from "../ingredientSearch/ingredientSearch";
import Ingredient from "../ingredient/ingredient";

const Mixologist = ({ mixologist }) => {
  const dispatch = useMixologistsDispatch();
  const addIngredient = useCallback(
    ingredient => {
      const { id } = mixologist;

      dispatch({
        type: ADD_INGREDIENT,
        payload: { id, ingredient },
      });
    },
    [mixologist, dispatch]
  );
  const removeIngredient = useCallback(
    ingredient => {
      const { id } = mixologist;

      dispatch({
        type: REMOVE_INGREDIENT,
        payload: { id, ingredient },
      });
    },
    [mixologist, dispatch]
  );
  const setName = useCallback(({ target: { value: name } }) => {
    const { id } = mixologist;

    dispatch({
      type: SET_NAME,
      payload: { id, name },
    });
  });

  return (
    <article className="mixologist">
      <input
        className="mixologist__name"
        placeholder="Enter a name"
        onBlur={setName}
      ></input>
      <IngredientSearch
        className="mixologist__ingredient-search"
        addIngredient={addIngredient}
        ingredients={mixologist.ingredients}
      ></IngredientSearch>
      <ul className="mixologist__ingredient-list">
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
