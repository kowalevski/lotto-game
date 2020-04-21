import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useInterval } from 'beautiful-react-hooks';
import { mapValues } from 'lodash';
import { ThemeContext, useTheme } from '../ThemeSwitcher';
import Scorecard from './Scorecard';
import Header from './Header';
import Showman from './Showman';
import BingoNumbers from './BingoNumbers';
import Chips from './Chips';
import Result from './Result';
import utils from '../utils';

const Home = ({ user }) => {
  const theme = useTheme();
  const generatedChips = useMemo(() => utils.generateChips(), []);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isResultShown, setIsResultShown] = useState(false);
  const [chips, setChips] = useState(generatedChips);
  const [draggedChipId, setDraggedChipId] = useState(false);
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

  const handleResetDropChip = ({ target }) => {
    if (
      target.className.includes('bingo-number') ||
      target.className.includes('bingo-number-text')
    ) {
      return;
    }

    setChips(ch => ({
      ...mapValues(ch, chip => ({
        ...chip,
        isDragged: false
      }))
    }));
    setDraggedChipId(null);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleResetDropChip);

    if (!isCleared && usedBingoNumbers.length === 89) {
      clearInterval();
    }

    if (draggedChipId !== null) {
      document.body.style.cursor = 'url(./chip.png), auto';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      document.body.removeEventListener('click', handleResetDropChip);
    };
  }, [usedBingoNumbers, isCleared, draggedChipId]);

  const handleStartGame = () => setIsGameStarted(true);

  const handleDragChip = id => {
    const isChipDragged = chips[id].isDragged;

    setChips({
      ...mapValues(chips, chip => ({ ...chip, isDragged: false })),
      [id]: { ...chips[id], isDragged: !isChipDragged }
    });
    setDraggedChipId(id);
  };

  const handleDropChip = () => {
    setChips({
      ...chips,
      [draggedChipId]: { ...chips[draggedChipId], isDropped: true }
    });
    setDraggedChipId(null);
  };

  const handleResetChip = id => {
    setChips({
      ...chips,
      [id]: { ...chips[id], isDropped: false }
    });
  };

  const handleHideResult = () => {
    setIsResultShown(false);
    setIsGameStarted(false);
  };

  const handleShowResult = () => setIsResultShown(true);

  return (
    <ThemeContext.Provider value={theme}>
      <Header user={user} />
      <Container>
        <Result isResultShown={isResultShown} onHideResult={handleHideResult} />
        <br />
        {isGameStarted ? (
          <>
            <Row>
              <Col md={12}>
                <Button variant="success" size="sm" onClick={handleShowResult}>
                  Finish Game
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={7}>
                <Scorecard
                  draggedChipId={draggedChipId}
                  onDrop={handleDropChip}
                  onReset={handleResetChip}
                />
                <br />
                <Chips chips={chips} onDrag={handleDragChip} />
              </Col>
              <Col md={5}>
                <Showman time={time} bingoNumber={bingoNumber} />
                <br />
                <BingoNumbers numbers={usedBingoNumbers} />
              </Col>
            </Row>
          </>
        ) : (
          <Row className="justify-content-center">
            <Button size="lg" variant="success" onClick={handleStartGame}>
              Start Game
            </Button>
          </Row>
        )}
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
