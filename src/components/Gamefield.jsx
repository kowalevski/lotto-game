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
  const { cells, rows } = useMemo(() => utils.generateBingoNumbers(), []);
  const [cardNumbers, setBingoNumbers] = useState({ ...cells });
  const generatedChips = useMemo(() => utils.generateChips(), []);
  const [isResultShown, setIsResultShown] = useState(false);
  const [chips, setChips] = useState(generatedChips);
  const [draggedChipId, setDraggedChipId] = useState(null);
  const [usedBingoNumbers, setUsedBingoNumbers] = useState([]);
  const [time, setTime] = useState(5);
  const [isCleared, clearInterval] = useInterval(() => {
    setTime(t => t - 1);

    if (time === 0) {
      const bn = utils.getRandomInt(1, 90, usedBingoNumbers);
      setUsedBingoNumbers([...usedBingoNumbers, bn]);
      setTime(5);
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

  const getResult = () => {
    const {
      guessedNumbers,
      wrongNumbers,
      otherNumbers,
      allNumbers: all
    } = Object.values(cardNumbers).reduce(
      (acc, { bingoNumber, isChecked }) => {
        if (!bingoNumber) return acc;

        const allNumbers = [...acc.allNumbers, bingoNumber];

        if (!isChecked)
          return {
            ...acc,
            allNumbers,
            otherNumbers: [...acc.otherNumbers, bingoNumber]
          };

        if (usedBingoNumbers.includes(bingoNumber)) {
          return {
            ...acc,
            allNumbers,
            guessedNumbers: [...acc.guessedNumbers, bingoNumber]
          };
        }

        return {
          ...acc,
          allNumbers,
          wrongNumbers: [...acc.wrongNumbers, bingoNumber]
        };
      },
      {
        guessedNumbers: [],
        wrongNumbers: [],
        otherNumbers: [],
        allNumbers: []
      }
    );
    const missedNumbers = usedBingoNumbers.filter(bn =>
      otherNumbers.includes(bn)
    );
    const isPlayerWinner = guessedNumbers.length === all.length;

    return { guessedNumbers, wrongNumbers, missedNumbers, isPlayerWinner };
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
  } = useMemo(getResult, [isResultShown]);

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
            <span>Finish Game </span>
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
