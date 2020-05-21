import React, { useContext } from 'react';
import './mixologistList.css';
import Mixologist from '../mixologist/mixologist';
import { MixologistsContext } from '../../context/MixologistsContext';

const MixologistList = () => {
  const mixologists = useContext(MixologistsContext);

  return (
    <section className="mixologist-list">
      {mixologists.map(mixologist => {
        return <Mixologist key={mixologist} id={mixologist}></Mixologist>;
      })}
    </section>
  );
};

export default MixologistList;
