import { getCoordinate } from "./coordinates";

const DIRECTIONS = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 }
];

/**
 * function getNeighborsForCoordinate(coordinates, coordinate, player)
 *
 * This function gets all neighbors for a vertex.
 *
 * @param {array} coordinates
 * @param {Object} vertex
 * @param {int} player
 */
export function getNeighborsForVertex(coordinates, vertex, player) {
  const coordinate = coordinates[vertex - 1];

  return DIRECTIONS.map(function(direction) {
    const xNeighbor = coordinate.x + direction.x;
    const yNeighbor = coordinate.y + direction.y;

    const neighborCoordinate = getCoordinate(coordinates, xNeighbor, yNeighbor);

    if (neighborCoordinate) {
      return neighborCoordinate;
    }
  });
}
