import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../layout/layout';
import SEO from '../seo/seo';
import './app.css';
import { getMixologists } from '../../services/database';
import { MixologistsContext } from '../../context/MixologistsContext';
import { ApplicationContext } from '../../context/ApplicationContext';
import MixologistList from '../mixologistList/mixologistList';
import CommonIngredients from '../commonIngredients/commonIngredients';
import SelectMixologists from '../selectMixologists/selectMixologists';
import { useSession } from '../../hooks/useSession';

const App = () => {
  const { session } = useSession();
  const [mixologists, setMixologists] = useState([]);
  const data = useStaticQuery(graphql`
    query DataQuery {
      allConstantsJson {
        nodes {
          MAX_MIXOLOGISTS
          MIN_MIXOLOGISTS
        }
      }
      allIngredientsJson(sort: { fields: id, order: ASC }) {
        nodes {
          id
        }
      }
    }
  `);
  const {
    allConstantsJson: {
      nodes: [constants],
    },
  } = data;
  const {
    allIngredientsJson: { nodes: ingredients },
  } = data;

  useEffect(() => {
    const fetchMixologists = async () => {
      if (session) {
        setMixologists(await getMixologists(session));
      }
    };

    fetchMixologists();
  }, [session]);

  return (
    <ApplicationContext.Provider value={{ constants, ingredients }}>
      <MixologistsContext.Provider value={mixologists}>
        <Layout>
          <SEO title="Home" />
          {!!mixologists.length && (
            <section className="console">
              <CommonIngredients />
              <MixologistList />
            </section>
          )}
          {!session && <SelectMixologists></SelectMixologists>}
        </Layout>
      </MixologistsContext.Provider>
    </ApplicationContext.Provider>
  );
};

export default App;
