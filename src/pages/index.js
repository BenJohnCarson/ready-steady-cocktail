import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import firebase from "../services/firebase";
import { useLocation } from "@reach/router";
import queryString from "query-string";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "./index.css";
import { MixologistsContext } from "../context/MixologistsContext";
import { ApplicationContext } from "../context/ApplicationContext";
import MixologistList from "../components/mixologistList/mixologistList";
import CommonIngredients from "../components/commonIngredients/commonIngredients";
import SelectMixologists from "../components/selectMixologists/selectMixologists";

const IndexPage = () => {
  const [mixologists, setMixologists] = useState([]);
  const [session, setSession] = useState("");

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
  const { search } = useLocation();

  useEffect(() => {
    const session = queryString.parse(search).session;

    if (session) {
      setSession(session);
    }
  }, [search]);

  useEffect(() => {
    const fetchMixologists = async () => {
      if (session) {
        let dbMixologists = [];
        const mixologistsSnap = await firebase.db
          .ref(`/sessions/${session}/mixologists`)
          .once("value");

        mixologistsSnap.forEach(mixologistSnap => {
          dbMixologists.push(mixologistSnap.key);
        });

        setMixologists(dbMixologists);
      }
    };

    fetchMixologists();
  }, [session]);

  return (
    <ApplicationContext.Provider value={{ constants, ingredients, session }}>
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

export default IndexPage;
