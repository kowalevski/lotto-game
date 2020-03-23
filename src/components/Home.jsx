import React from 'react';
import { Container, Row, Navbar, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Scorecard from './Scorecard';
import { ThemeContext, useTheme } from '../ThemeSwitcher';
import ThemeControl from './ThemeControl';

const Home = ({ user }) => {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {user ? (
              <Navbar.Text>{user.login}</Navbar.Text>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <br />
        <Row className="justify-content-center">
          <Scorecard />
        </Row>
        <br />
        <Row className="justify-content-center">
          <Col md="6">
            <ThemeControl />
          </Col>
        </Row>
      </Container>
    </ThemeContext.Provider>
  );
};

Home.propTypes = {
  user: PropTypes.objectOf({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired
};

export default Home;
