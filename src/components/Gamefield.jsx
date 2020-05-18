import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useInterval } from 'beautiful-react-hooks';
import { mapValues } from 'lodash';
import PropTypes from 'prop-types';
import Scorecard from 'Scorecard';
import Showman from 'Showman';
import BingoNumbers from 'BingoNumbers';
import Chips from 'Chips';
import Result from 'Result';
import utils, { getRandomInt } from '../utils';
import constants from '../constants';

const Gamefield = ({ onFinishGame, username }) => {
  const { cells, rows } = useMemo(() => utils.generateBingoNumbers(), []);
  const generatedChips = useMemo(() => utils.makeChips(), []);
  const [cardNumbers, setBingoNumbers] = useState(cells);
  const [isResultShown, setIsResultShown] = useState(false);
  const [chips, setChips] = useState(generatedChips);
  const [draggedChipId, setDraggedChipId] = useState(null);
  const [usedBingoNumbers, setUsedBingoNumbers] = useState([]);
  const [time, setTime] = useState(constants.GETTING_BARREL_NUMBER_TIME);
  const [isCleared, clearInterval] = useInterval(() => {
    setTime(t => t - 1);

    if (time === 0) {
      const bn = getRandomInt(1, constants.MAX_BINGO_NUMBERS, usedBingoNumbers);
      setUsedBingoNumbers([...usedBingoNumbers, bn]);
      setTime(constants.GETTING_BARREL_NUMBER_TIME);
    }
  }, 1000);
  const currentBingoNumber = useMemo(
    () => usedBingoNumbers[usedBingoNumbers.length - 1],
    [usedBingoNumbers]
  );

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

    if (!isCleared && usedBingoNumbers.length === constants.LAST_BINGO_NUMBER) {
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
  }, [usedBingoNumbers, isCleared, draggedChipId, isResultShown]);

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

  const handleCoverCardSquare = cellId => {
    const { bingoNumber, isChecked, chipId } = cardNumbers[cellId];

    if (chipId !== null) {
      setBingoNumbers({
        ...cardNumbers,
        [cellId]: { bingoNumber, isChecked: false, chipId: null }
      });
      handleResetChip(chipId);
      return;
    }

    if (draggedChipId === null) return;

    setBingoNumbers({
      ...cardNumbers,
      [cellId]: { bingoNumber, isChecked: !isChecked, chipId: draggedChipId }
    });
    handleDropChip();
  };

  const {
    guessedNumbers,
    wrongNumbers,
    missedNumbers,
    isPlayerWinner
  } = useMemo(() => utils.getResult(cardNumbers, usedBingoNumbers), [
    isResultShown
  ]);

  return (
    <>
      <Result
        isResultShown={isResultShown}
        onFinishGame={onFinishGame}
        username={username}
        guessedNumbers={guessedNumbers}
        wrongNumbers={wrongNumbers}
        missedNumbers={missedNumbers}
        isPlayerWinner={isPlayerWinner}
      />
      <br />
      <Row>
        <Col md={12}>
          <Button variant="success" size="sm" onClick={handleShowResult}>
            Finish Game
            <span role="img" aria-label="finish">
              🏁
            </span>
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={7}>
          <Scorecard
            onCover={handleCoverCardSquare}
            rows={rows}
            cardNumbers={cardNumbers}
          />
          <br />
          <Chips chips={chips} onDrag={handleDragChip} />
        </Col>
        <Col md={5}>
          <Showman time={time} bingoNumber={currentBingoNumber} />
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
