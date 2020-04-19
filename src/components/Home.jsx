import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useInterval } from 'beautiful-react-hooks';
import { ThemeContext, useTheme } from '../ThemeSwitcher';
import Scorecard from './Scorecard';
import Header from './Header';
import Showman from './Showman';
import BingoNumbers from './BingoNumbers';
import utils from '../utils';

const Home = ({ user }) => {
  const theme = useTheme();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [bingoNumber, setBingoNumber] = useState(null);
  const [usedBingoNumbers, setUsedBingoNumbers] = useState([]);
  const [time, setTime] = useState(0);
  const [isCleared, clearInterval] = useInterval(() => {
    if (isGameStarted) {
      setTime(t => t + 1);

      if (time === 5) {
        const bn = utils.getRandomInt(1, 90, usedBingoNumbers);
        setBingoNumber(bn);
        setUsedBingoNumbers([...usedBingoNumbers, bn]);
        setTime(0);
      }
    }
  }, 1000);

  const handleStartGame = () => setIsGameStarted(true);

  useEffect(() => {
    if (!isCleared && usedBingoNumbers.length === 89) {
      clearInterval();
    }
  }, [usedBingoNumbers, isCleared]);

  return (
    <ThemeContext.Provider value={theme}>
      <Header user={user} />
      <Container>
        <br />
        <Row className="justify-content-center">
          {isGameStarted ? (
            <>
              <Col md={7}>
                <Scorecard />
              </Col>
              <Col md={5}>
                <Showman time={time} bingoNumber={bingoNumber} />
                <br />
                <BingoNumbers numbers={usedBingoNumbers} />
              </Col>
            </>
          ) : (
            <Button size="lg" variant="success" onClick={handleStartGame}>
              Start Game
            </Button>
          )}
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
