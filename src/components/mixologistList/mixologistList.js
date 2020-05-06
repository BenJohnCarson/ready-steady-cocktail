import React from "react";
import "./mixologistList.css";
import Mixologist from "../mixologist/mixologist";
import { useMixologistsState } from "../../context/MixologistsContext";

const MixologistList = () => {
  const mixologists = useMixologistsState();

  return (
    <section className="mixologist-list">
      {mixologists.map(mixologist => {
        return (
          <Mixologist key={mixologist.id} mixologist={mixologist}></Mixologist>
        );
      })}
    </section>
  );
};

export default MixologistList;
