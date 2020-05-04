import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext, useTheme } from '../ThemeSwitcher';
import Header from './Header';
import Gamefield from './Gamefield';

const Home = ({ user }) => {
  const theme = useTheme();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => setIsGameStarted(true);

  const handleFinishGame = () => setIsGameStarted(false);

  return (
    <ThemeContext.Provider value={theme}>
      <Header user={user} />
      <br />
      <Container>
        {isGameStarted ? (
          <Gamefield
            onFinishGame={handleFinishGame}
            username={user ? user.login : null}
          />
        ) : (
          <Row className="justify-content-center">
            <Button size="lg" variant="success" onClick={handleStartGame}>
              Start Game
              <span role="img" aria-label="start">
                🚀
              </span>
            </Button>
          </Row>
        )}
      </Container>
    </ThemeContext.Provider>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
};

Home.defaultProps = {
  user: null
};

export default Home;
