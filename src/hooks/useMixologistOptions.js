import { useContext, useMemo } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';

export const useMixologistOptions = (min, max) => {
  const {
    constants: { MAX_MIXOLOGISTS, MIN_MIXOLOGISTS },
  } = useContext(ApplicationContext);
  const minMixologists = min === 0 ? min : min || MIN_MIXOLOGISTS;
  const maxMixologists = max || MAX_MIXOLOGISTS;

  return useMemo(() => {
    let options = [];

    for (let value = minMixologists; value <= maxMixologists; value++) {
      options.push({ value });
    }
    return options;
  }, [maxMixologists, minMixologists]);
};
