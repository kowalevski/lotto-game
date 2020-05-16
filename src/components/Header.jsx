import React, { useContext } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext, DARK_THEME } from '../ThemeSwitcher';

const Header = ({ user }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { url } = useRouteMatch();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">
        Home
      </Link>
      <Nav className="mr-auto">
        <Link to={`${url}/quiz`} className="nav-link">
          Quiz
        </Link>
        <Link to={`${url}/winner-status`} className="nav-link">
          Winner Status
        </Link>
        <Link to={`${url}/blog`} className="nav-link">
          Blog
        </Link>
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {user ? (
            <Navbar.Text>
              Signed in as:
              <a href="/"> {user.login}</a>
            </Navbar.Text>
          ) : (
            <>
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
          <Form.Check
            type="switch"
            id="theme-switch"
            onClick={() => {
              toggleTheme();
            }}
            label={theme === DARK_THEME ? '🌒' : '🌔'}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
};

Header.defaultProps = {
  user: null
};

export default Header;
