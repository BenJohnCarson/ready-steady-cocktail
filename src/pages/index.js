import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { db } from "../services/firebase";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "./index.css";
import { MixologistsContext } from "../context/MixologistsContext";
import { ApplicationContext } from "../context/ApplicationContext";
import MixologistList from "../components/mixologistList/mixologistList";
import CommonIngredients from "../components/commonIngredients/commonIngredients";

const session = "one";

const IndexPage = () => {
  const [mixologists, setMixologists] = useState([]);
  const data = useStaticQuery(graphql`
    query DataQuery {
      allConstantsJson {
        nodes {
          MAX_MIXOLOGISTS
          MIN_MIXOLOGISTS
        }
      }
      allIngredientsJson {
        nodes {
          name
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
      let dbMixologists = [];
      const mixologistsSnap = await db
        .ref(`/sessions/${session}/mixologists`)
        .once("value");

      mixologistsSnap.forEach(mixologistSnap => {
        dbMixologists.push(mixologistSnap.key);
      });
      setMixologists(dbMixologists);
    };

    fetchMixologists();
  }, []);

  return (
    <ApplicationContext.Provider value={{ constants, ingredients, session }}>
      <MixologistsContext.Provider value={mixologists}>
        <Layout>
          <SEO title="Home" />
          <section className="console">
            <CommonIngredients />
            <MixologistList />
          </section>
        </Layout>
      </MixologistsContext.Provider>
    </ApplicationContext.Provider>
  );
};

export default IndexPage;
