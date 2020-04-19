/* eslint-disable no-plusplus */
import { v4 as uuid } from 'uuid';

const EMPTY_CELLS_MAX_COUNT = {
  ROW: 4,
  COLUMN: 2
};

const CELLS_ROW_MAX_COUNT = 9;
const ROWS_MAX_COUNT = 3;

const NUMBERS_RANGE = {
  MIN: 1,
  MAX: 90
};

const getRandomInt = (argMin, argMax, exclude) => {
  const min = Math.ceil(argMin);
  const max = Math.floor(argMax);
  const res = Math.floor(Math.random() * (max - min)) + min;

  return exclude.includes(res) ? getRandomInt(argMin, argMax, exclude) : res;
};

const isEmptyCell = (rowEmptyCells, columnEmptyCells) => {
  const isEmpty = Math.random() >= 0.5;

  return (
    (!rowEmptyCells || rowEmptyCells < EMPTY_CELLS_MAX_COUNT.ROW) &&
    (!columnEmptyCells || columnEmptyCells < EMPTY_CELLS_MAX_COUNT.COLUMN) &&
    isEmpty
  );
};

const getBingoNumber = (usedNumbers, rowEmptyCells, columnEmptyCells) => {
  return isEmptyCell(rowEmptyCells, columnEmptyCells)
    ? null
    : getRandomInt(NUMBERS_RANGE.MIN, NUMBERS_RANGE.MAX, usedNumbers);
};

const increaseAdditionalCounters = (countersData, iteration) => ({
  ...countersData,
  [iteration]: !countersData[iteration] ? 1 : countersData[iteration] + 1
});

const generateBingoNumbers = () => {
  const rows = {};
  let cells = {};

  const usedNumbers = [];
  let rowsEmptyCellsMap = {};
  let columnsEmptyCellsMap = {};

  for (let i = 0; i < ROWS_MAX_COUNT; i++) {
    for (let j = 0; j < CELLS_ROW_MAX_COUNT; j++) {
      const idKey = uuid();
      const bingoNumber = getBingoNumber(
        usedNumbers,
        rowsEmptyCellsMap[i],
        columnsEmptyCellsMap[j]
      );

      if (typeof bingoNumber === 'number') {
        usedNumbers.push(bingoNumber);
      } else {
        rowsEmptyCellsMap = increaseAdditionalCounters(rowsEmptyCellsMap, i);
        columnsEmptyCellsMap = increaseAdditionalCounters(
          columnsEmptyCellsMap,
          j
        );
      }

      rows[i] = [...(rows[i] || []), idKey];
      cells = { ...cells, [idKey]: { bingoNumber, isChecked: false } };
    }
  }

  return { rows, cells };
};

const generateChips = () =>
  Array.from(new Array(20)).reduce(
    (acc, _, i) => ({
      ...acc,
      [i]: {
        id: i,
        isDragged: false,
        isDropped: false
      }
    }),
    {}
  );

export default {
  generateBingoNumbers,
  getRandomInt,
  generateChips
};
