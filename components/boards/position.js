/*
 * Hexagon width proportion
 * An hexagon is not square. Approximatively, width is 0.89 unit of height.
 */
const hexagonWidthProportion = 0.89;

/*
 * Hexagon height three quarter
 * Each hexagon is entangled in the two hexagons above. To represent this entanglement, we need to manage with the "three quarter" height.
 */
const hexagonRowOffset = 0.75;

export function getBoardRatio(size) {
  const height = 1 + (size - 1) * hexagonRowOffset;

  const width =
    size * hexagonWidthProportion +
    (size * hexagonWidthProportion - hexagonWidthProportion) / 2;

  return height / width;
}

export function getHexagonWidth(size) {
  return 100 / (size + (size - 1) / 2);
}

export function getHexagonHeight(size) {
  return 100 / (1 + (size - 1) * hexagonRowOffset);
}

export function calculateTopPosition(rowIndex, hexagonHeight) {
  return rowIndex * hexagonHeight * hexagonRowOffset;
}

export function calculateLeftPosition(columnIndex, rowIndex, hexagonWidth) {
  const lineOffset = (rowIndex * hexagonWidth) / 2;

  return lineOffset + hexagonWidth * columnIndex;
}
