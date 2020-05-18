import React from 'react';
// import { renderHook } from '@testing-library/react-hooks';
import { render, act } from '@testing-library/react';
import useChips from '../useChips';

const testChipId1 = 1;
const testChipId2 = 2;

it('control chips', async () => {
  let chipsData;
  const Wrapper = () => {
    chipsData = useChips();
    return null;
  };
  render(<Wrapper />);
  // const {
  //   result: { current: chipsData },
  // } = renderHook(useChips);

  act(() => chipsData.dragChip(testChipId1));
  expect(chipsData.draggedChipId).not.toBeNull();
  expect(chipsData.chips[testChipId1].isDragged).toBe(true);

  act(() => chipsData.dropChip());
  expect(chipsData.draggedChipId).toBeNull();
  expect(chipsData.chips[testChipId1].isDropped).toBe(true);

  act(() => chipsData.resetDroppedChip(testChipId1));
  expect(chipsData.chips[testChipId1].isDropped).toBe(false);

  act(() => chipsData.dragChip(testChipId2));
  expect(chipsData.draggedChipId).not.toBeNull();
  expect(chipsData.chips[testChipId2].isDragged).toBe(true);
  act(() => chipsData.resetDraggedChips());
  expect(chipsData.draggedChipId).toBeNull();
  expect(chipsData.chips[testChipId1].isDragged).toBe(false);
});
