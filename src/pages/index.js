import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import Main from "../components/main/main";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Main />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
