import React from "react";
import "./main.css";
import Mixologist from "../mixologist/mixologist";

const Main = () => {
  return (
    <section className="main">
      <Mixologist></Mixologist>
      <Mixologist></Mixologist>
      <Mixologist></Mixologist>
    </section>
  );
};

export default Main;
