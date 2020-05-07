import React, { useCallback, useState, useEffect, useContext } from "react";
import "./mixologist.css";
import { useMixologistsDispatch } from "../../context/MixologistsContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_NAME,
} from "../../reducers/mixologistsReducer";
import IngredientSearch from "../ingredientSearch/ingredientSearch";
import Ingredient from "../ingredient/ingredient";
import { db } from "../../services/firebase";

const Mixologist = ({ id }) => {
  const [mixologist, setMixologist] = useState({});
  const { session } = useContext(ApplicationContext);
  // const dispatch = useMixologistsDispatch();
  const addIngredient = ingredient => {
    db.ref(`/sessions/${session}/ingredients/${ingredient}`).update({
      [`/mixologists/${id}`]: true,
    });
    db.ref(`/mixologists/${id}`).update({
      [`/ingredients/${ingredient}`]: true,
    });
  };
  const removeIngredient = ingredient => {
    db.ref(`/sessions/${session}/ingredients/${ingredient}`).update({
      [`/mixologists/${id}`]: null,
    });
    db.ref(`/mixologists/${id}`).update({
      [`/ingredients/${ingredient}`]: null,
    });
  };
  const setName = ({ target: { value: name } }) => {
    return db.ref(`/mixologists/${id}`).update({
      name,
    });
  };
  // const addIngredient = useCallback(
  //   ingredient => {
  //     const { id } = mixologist;

  //     dispatch({
  //       type: ADD_INGREDIENT,
  //       payload: { id, ingredient },
  //     });
  //   },
  //   [mixologist, dispatch]
  // );
  // const removeIngredient = useCallback(
  //   ingredient => {
  //     const { id } = mixologist;

  //     dispatch({
  //       type: REMOVE_INGREDIENT,
  //       payload: { id, ingredient },
  //     });
  //   },
  //   [mixologist, dispatch]
  // );
  // const setName = useCallback(
  //   ({ target: { value: name } }) => {
  //     const { id } = mixologist;

  //     dispatch({
  //       type: SET_NAME,
  //       payload: { id, name },
  //     });
  //   },
  //   [mixologist, dispatch]
  // );

  useEffect(() => {
    const mixologistRef = db.ref(`/mixologists/${id}`);

    mixologistRef.on("value", mixologistSnap => {
      console.log("new val ", mixologistSnap.val());
      setMixologist(mixologistSnap.val());
    });
    return () => mixologistRef.off();
  }, []);

  return (
    <article className="mixologist">
      <input
        className="mixologist__name"
        placeholder="Enter a name"
        onBlur={setName}
        defaultValue={mixologist.name}
      ></input>
      <IngredientSearch
        className="mixologist__ingredient-search"
        addIngredient={addIngredient}
      ></IngredientSearch>
      <ul className="mixologist__ingredient-list">
        {mixologist.ingredients &&
          Object.keys(mixologist.ingredients).map((ingredient, index) => (
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
