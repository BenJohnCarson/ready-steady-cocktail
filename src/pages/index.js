import React from "react";
// import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "./index.css";
import { MixologistsProvider } from "../context/MixologistsContext";
import { ApplicationContext } from "../context/ApplicationContext";
import MixologistList from "../components/mixologistList/mixologistList";
import CommonIngredients from "../components/commonIngredients/commonIngredients";

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

  // Test loading data from a db
  const test = [
    {
      id: 'sefseseff',
      name: "Ben",
      ingredients: [{name: "Rum"}, {name: "Gin"}],
    },
    {
      id: 'sefsef',
      name: "Si",
      ingredients: [{name: "Rum"}],
    },
    {
      id: 'seffsef',
      name: "Andy",
      ingredients: [{name: "Rum"}, {name: "Vodka"}],
    },
  ]

  return (
    <ApplicationContext.Provider value={{ constants, ingredients }}>
      <MixologistsProvider defaultState={test}>
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
