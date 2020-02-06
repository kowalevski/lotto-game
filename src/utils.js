import { v4 as uuid } from 'uuid';

const getRandomInt = (argMin, argMax) => {
  const min = Math.ceil(argMin);
  const max = Math.floor(argMax);
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateBingoNumber = () => {
  const lastRowNumber = 2;
  const rowNumbersMaxCount = 5;
  const rowSquaresMaxCount = 8;
  const beginRange = 1;
  const endRange = 90;
  const bingoNumbers = {};
  let currentRow = 0;

  do {
    const randNum = getRandomInt(beginRange, endRange);
    const idKey = uuid();
    const isEmpty = Math.random() >= 0.5;
    const bingoNumber = isEmpty ? null : randNum;

    bingoNumbers[currentRow] = {
      ...bingoNumbers[currentRow],
      [idKey]: { bingoNumber, isChecked: false }
    };
    const currentRowSquares = bingoNumbers[currentRow]
      ? Object.values(bingoNumbers[currentRow])
      : [];
    const currentRowNumbers = currentRowSquares.filter(
      square => !Number.isNaN(parseInt(square.bingoNumber, 10))
    );
    const isRowEmpty = currentRowSquares.every(square => !square.bingoNumber);

    if (currentRowSquares.length > rowSquaresMaxCount) {
      if (
        isRowEmpty ||
        currentRowNumbers.length < rowNumbersMaxCount ||
        currentRowNumbers.length > rowNumbersMaxCount
      ) {
        bingoNumbers[currentRow] = {};
      } else {
        currentRow += 1;
      }
    }
  } while (
    !bingoNumbers[lastRowNumber] ||
    Object.values(bingoNumbers[lastRowNumber]).length <= rowSquaresMaxCount
  );

  return bingoNumbers;
};

export default {
  generateBingoNumber
};
