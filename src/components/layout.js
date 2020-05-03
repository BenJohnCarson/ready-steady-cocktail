/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./header";
import "./layout.css";
import { MixologistsProvider } from "../context/MixologistsContext";
import { ApplicationContext } from "../context/ApplicationContext";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query InitialQuery {
      site {
        siteMetadata {
          title
        }
      }
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
  const {allConstantsJson: {nodes: [constants]}} = data;
  const {allIngredientsJson: { nodes: ingredients }} = data;

  return (
    <ApplicationContext.Provider value={{constants, ingredients}}>
      <MixologistsProvider>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </MixologistsProvider>
    </ApplicationContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
