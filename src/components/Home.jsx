import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getRandomNamedBingoNumber } from '../utils';
import { ThemeContext, useTheme } from '../ThemeSwitcher';
import Header from './Header';
import Gamefield from './Gamefield';
import BingoNumberQuiz from './BingoNumberQuiz';
import WinnerStatusVerification from './WinnerStatusVerification';

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
        <Route
          path="/"
          render={() => (
            <>
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
            </>
          )}
        />
        <Route
          path="/quiz"
          render={() => (
            <BingoNumberQuiz bingoNumber={getRandomNamedBingoNumber()} />
          )}
        />
        <Route path="/winner-status" component={WinnerStatusVerification} />
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
