import React from "react";
import "./main.css";
import Mixologist from "../mixologist/mixologist";
import {useMixologistsState} from "../../context/MixologistsContext";

const Main = () => {
  const { mixologists } = useMixologistsState();

  return (
    <section className="main">
      {
        mixologists.map((mixologist) => {
          return <Mixologist key={mixologist.id}></Mixologist>
        })
      }
    </section>
  );
};

export default Main;
