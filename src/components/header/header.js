import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import './header.css';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#18181E`,
      marginBottom: `1.45rem`,
    }}
  >
    <nav
      className="nav"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }} className="nav__title">
        <Link
          to="/"
          style={{
            color: `#DEC79B`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
