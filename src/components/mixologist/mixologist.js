import React from "react";
import "./mixologist.css";

const Mixologist = () => {
  return (
    <article className="mixologist">
      <input className="name"></input>
      <input className="ingredient-search"></input>
      <ul className="ingredient-list">
        <li className="ingredient">Vodka</li>
      </ul>
    </article>
  );
};

export default Mixologist;
