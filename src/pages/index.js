import React from "react";
import * as firebase from "firebase/app";
// import "firebase/database"
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "./index.css";
import { MixologistsProvider } from "../context/MixologistsContext";
import { ApplicationContext } from "../context/ApplicationContext";
import MixologistList from "../components/mixologistList/mixologistList";
import CommonIngredients from "../components/commonIngredients/commonIngredients";

const firebaseConfig = {
  apiKey: "AIzaSyBF48g22jZevys2ZV110JDjNGNPGpL75No",
  authDomain: "ready-steady-cocktail.firebaseapp.com",
  databaseURL: "https://ready-steady-cocktail.firebaseio.com",
  storageBucket: "ready-steady-cocktail.appspot.com",
};

const IndexPage = () => {
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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <ApplicationContext.Provider value={{ constants, ingredients }}>
      <MixologistsProvider>
        <Layout>
          <SEO title="Home" />
          <section className="console">
            <CommonIngredients />
            <MixologistList />
          </section>
          {/* <Link to="/page-2/">Go to page 2</Link> */}
        </Layout>
      </MixologistsProvider>
    </ApplicationContext.Provider>
  );
};

export default IndexPage;
