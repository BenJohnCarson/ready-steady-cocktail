import React, { useContext, useMemo, useCallback } from 'react';
import Select from 'react-select';
import { ApplicationContext } from '../../context/ApplicationContext';
import { useSession } from '../../hooks/useSession';

const SelectMixologists = () => {
  const { newSession } = useSession();
  const {
    constants: { MAX_MIXOLOGISTS, MIN_MIXOLOGISTS },
  } = useContext(ApplicationContext);
  const options = useMemo(() => {
    let options = [];

    for (let value = MIN_MIXOLOGISTS; value <= MAX_MIXOLOGISTS; value++) {
      options.push({ value });
    }
    return options;
  }, [MAX_MIXOLOGISTS, MIN_MIXOLOGISTS]);
  const getOptionValue = useCallback(option => option.value, []);
  const handleOnChange = ({ value: mixologistsCount }) => {
    newSession(mixologistsCount);
  };

  return (
    <Select
      placeholder="How many mixologists?"
      options={options}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionValue}
      onChange={handleOnChange}
    ></Select>
  );
};

export default SelectMixologists;
