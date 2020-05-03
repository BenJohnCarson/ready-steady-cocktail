import React, { useContext } from "react";
import Select from "react-select";
import { ApplicationContext } from "../../context/ApplicationContext";

const IngredientSearch = ({ addIngredient }) => {
  const { ingredients } = useContext(ApplicationContext);
  const handleOnChange = ingredient => {
    if (ingredient) {
      addIngredient(ingredient);
    }
  };

  return (
    <Select
      className="ingredient-search"
      placeholder="Start typing an ingredient"
      options={ingredients}
      isClearable={true}
      getOptionValue={option => option.name}
      getOptionLabel={option => option.name}
      onChange={handleOnChange}
    />
  );
};

export default IngredientSearch;
