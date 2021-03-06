import React, { useContext, useCallback } from 'react';
import Select from 'react-select';
import { ApplicationContext } from '../../context/ApplicationContext';

const IngredientSearch = ({ addIngredient, className }) => {
  // TODO: Should switch to using ingredients from firebase instead
  const { ingredients } = useContext(ApplicationContext);
  const getOptionValue = useCallback(option => option.title, []);
  const handleOnChange = useCallback(
    ingredient => {
      if (ingredient) {
        addIngredient(ingredient);
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
