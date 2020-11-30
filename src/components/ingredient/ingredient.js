import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { MixologistsContext } from '../../context/MixologistsContext';
import { useSession } from '../../hooks/useSession';
import {
  getSessionIngredientMixologistsRef,
  getMixologist,
} from '../../services/database';
import './ingredient.css';

const Ingredient = ({ ingredient, children, showMissing, className }) => {
  const { session } = useSession();
  const sessionMixologists = useContext(MixologistsContext);
  const [missingMixologists, setMissingMixologists] = useState([]);
  const ingredientClass = classNames('ingredient', className);

  useEffect(() => {
    // TODO: This could do with tidying up
    const sessionIngredientMixologistsRef = getSessionIngredientMixologistsRef({
      session,
      ingredient,
    });

    if (showMissing) {
      sessionIngredientMixologistsRef.on(
        'value',
        sessionIngredientMixologistsSnap => {
          const val = sessionIngredientMixologistsSnap.val();

          if (val) {
            let updateMissingMixologists = [];

            sessionMixologists.forEach(mixologist => {
              if (!val[mixologist]) {
                updateMissingMixologists.push(mixologist);
              }
            });
            if (updateMissingMixologists.length) {
              Promise.all(
                updateMissingMixologists.map(mixologistId =>
                  getMixologist(mixologistId)
                )
              ).then(data =>
                setMissingMixologists(
                  data.map(mixologist => mixologist.val().name)
                )
              );
            }
          }
        }
      );
    }
    return () => sessionIngredientMixologistsRef.off();
  }, [ingredient, session, sessionMixologists, showMissing]);

  return (
    <li className={ingredientClass}>
      {ingredient.title}
      {showMissing &&
        !!missingMixologists.length &&
        missingMixologists.map(mixologist => (
          <span className="ingredient__missing-mixologist">{mixologist}</span>
        ))}
      {children}
    </li>
  );
};

export default Ingredient;
