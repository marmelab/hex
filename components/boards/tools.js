import React from "react";
import Hexagon from "./Hexagon";
import ButtomBoard from "./BottomBoard";

export function getBoardRatio(size) {
  return (1 + (size - 1) * 0.75) / (size * 0.89 + (size * 0.89 - 0.89) / 2);
}

export function getHexagonWidth(size) {
  return 100 / (size + (size - 1) / 2);
}

export function getHexagonHeight(size) {
  return 100 / (1 + (size - 1) * 0.75);
}

export function calculateTopPosition(rowIndex, hexagonHeight) {
  return rowIndex * hexagonHeight * 0.75;
}

export function calculateLeftPosition(columnIndex, rowIndex, hexagonWidth) {
  const lineOffset = (rowIndex * hexagonWidth) / 2;

  return lineOffset + hexagonWidth * columnIndex;
}
