import React, { useContext, useMemo, useCallback } from "react";
import Select from "react-select";
import { navigate } from "@reach/router";
import queryString from "query-string";
import { ApplicationContext } from "../../context/ApplicationContext";
import { SET_MIXOLOGISTS } from "../../reducers/mixologistsReducer";
import firebase from "../../services/firebase";

const SelectMixologists = () => {
  const {
    constants: { MAX_MIXOLOGISTS, MIN_MIXOLOGISTS },
    session,
  } = useContext(ApplicationContext);
  const options = useMemo(() => {
    let options = [];

    for (let value = MIN_MIXOLOGISTS; value <= MAX_MIXOLOGISTS; value++) {
      options.push({ value });
    }
    return options;
  }, [MAX_MIXOLOGISTS, MIN_MIXOLOGISTS]);
  const getOptionValue = useCallback(option => option.value, []);
  const handleOnChange = ({ value }) => {
    const newSessionKey = firebase.db.ref("/sessions").push().key;
    const sessionData = {};
    for (let i = 0; i < value; i++) {
      const newMixologistKey = firebase.db.ref("/mixologists").push().key;

      firebase.db.ref(`/mixologists/${newMixologistKey}`).set({ name: "" });
      sessionData[`/mixologists/${newMixologistKey}`] = true;
    }

    firebase.db.ref(`/sessions/${newSessionKey}`).update(sessionData);
    navigate(`?${queryString.stringify({ session: newSessionKey })}`);
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
