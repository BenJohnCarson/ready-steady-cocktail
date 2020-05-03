import React, { useContext, useMemo } from "react";
import Select from "react-select";
import { useMixologistsDispatch } from "../../context/MixologistsContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { SET_MIXOLOGISTS } from "../../reducers/mixologistsReducer";

const SelectMixologists = () => {
  const dispatch = useMixologistsDispatch();
  const handleOnChange = option =>
    dispatch({ type: SET_MIXOLOGISTS, payload: option.value });
  
  const {constants: {MAX_MIXOLOGISTS, MIN_MIXOLOGISTS}} = useContext(ApplicationContext);
  const options = useMemo(() => {
    let options = [];

    for(let value = MIN_MIXOLOGISTS; value <= MAX_MIXOLOGISTS; value++) {
      options.push({value});
    }
    return options;
  }, [MAX_MIXOLOGISTS, MIN_MIXOLOGISTS]);

  return (
    <Select
      placeholder="How many mixologists?"
      options={options}
      getOptionValue={option => option.value}
      getOptionLabel={option => option.value}
      onChange={handleOnChange}
    ></Select>
  );
};

export default SelectMixologists;
