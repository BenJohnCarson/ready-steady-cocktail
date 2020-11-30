import React, { useCallback } from 'react';
import Select from 'react-select';
import { useSession } from '../../hooks/useSession';
import { useMixologistOptions } from '../../hooks/useMixologistOptions';

const SelectMixologists = () => {
  const { newSession } = useSession();
  const options = useMixologistOptions();
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
