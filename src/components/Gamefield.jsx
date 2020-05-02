import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useInterval } from 'beautiful-react-hooks';
import { mapValues } from 'lodash';
import PropTypes from 'prop-types';
import utils from '../utils';
import Scorecard from './Scorecard';
import Showman from './Showman';
import BingoNumbers from './BingoNumbers';
import Chips from './Chips';
import Result from './Result';

const Gamefield = ({ onFinishGame, username }) => {
  const generatedChips = useMemo(() => utils.generateChips(), []);
  const [isResultShown, setIsResultShown] = useState(false);
  const [chips, setChips] = useState(generatedChips);
  const [draggedChipId, setDraggedChipId] = useState(null);
  const [bingoNumber, setBingoNumber] = useState(null);
  const [usedBingoNumbers, setUsedBingoNumbers] = useState([]);
  const [time, setTime] = useState(0);
  const [isCleared, clearInterval] = useInterval(() => {
    setTime(t => t + 1);

    if (time === 5) {
      const bn = utils.getRandomInt(1, 90, usedBingoNumbers);
      setBingoNumber(bn);
      setUsedBingoNumbers([...usedBingoNumbers, bn]);
      setTime(0);
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

  const handleShowResult = () => {
    clearInterval();
    setIsResultShown(true);
  };

  return (
    <>
      <Result
        isResultShown={isResultShown}
        onFinishGame={onFinishGame}
        username={username}
      />
      <br />
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
  );
};

Gamefield.propTypes = {
  onFinishGame: PropTypes.func.isRequired,
  username: PropTypes.string
};

Gamefield.defaultProps = {
  username: null
};

export default Gamefield;
