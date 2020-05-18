import { useState } from 'react';
import { mapValues } from 'lodash';
import { makeChips } from '../utils';

export default function useChips() {
  const [chips, setChips] = useState(makeChips);
  const [draggedChipId, setDraggedChipId] = useState(null);

  const dragChip = id => {
    const isChipDragged = chips[id].isDragged;

    setChips({
      ...mapValues(chips, chip => ({ ...chip, isDragged: false })),
      [id]: { ...chips[id], isDragged: !isChipDragged }
    });
    setDraggedChipId(id);
  };

  const dropChip = () => {
    setChips({
      ...chips,
      [draggedChipId]: { ...chips[draggedChipId], isDropped: true }
    });
    setDraggedChipId(null);
  };

  const resetDroppedChip = id => {
    setChips({
      ...chips,
      [id]: { ...chips[id], isDropped: false }
    });
  };

  const resetDraggedChips = () => {
    setChips(ch => ({
      ...mapValues(ch, chip => ({
        ...chip,
        isDragged: false
      }))
    }));
    setDraggedChipId(null);
  };

  return {
    chips,
    draggedChipId,
    // setChips,
    resetDraggedChips,
    dragChip,
    resetDroppedChip,
    dropChip
  };
}
