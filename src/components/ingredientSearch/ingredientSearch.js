import React, { useContext, useCallback } from "react";
import Select from "react-select";
import { ApplicationContext } from "../../context/ApplicationContext";

const IngredientSearch = ({ addIngredient, className }) => {
  const { ingredients } = useContext(ApplicationContext);
  const getOptionValue = useCallback(option => option.id, []);
  const handleOnChange = useCallback(
    ingredient => {
      if (ingredient) {
        addIngredient(ingredient.id);
      }
    },
    [addIngredient]
  );

  return (
    <Select
      className={className}
      placeholder="Start typing an ingredient"
      options={ingredients}
      isClearable={true}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionValue}
      onChange={handleOnChange}
    />
  );
};

export default IngredientSearch;
