import { getCoordinate } from "./coordinates";

const DISCARD_DISTANCE = 0;
const OWNED_DISTANCE = 1;

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

  const neighbors = DIRECTIONS.map(function(direction) {
    const xNeighbor = coordinate.x + direction.x;
    const yNeighbor = coordinate.y + direction.y;

    const neighborCoordinate = getCoordinate(coordinates, xNeighbor, yNeighbor);

    if (neighborCoordinate) {
      const distance = getDistanceByPlayer(neighborCoordinate, player);
      const neighbor = { id: neighborCoordinate.id, distance };
      return neighbor;
    }
  }).filter(function(neighbor) {
    if (neighbor) {
      return neighbor;
    }
  });

  return [
    neighbors.reduce((obj, item) => ((obj[item.id] = item.distance), obj), {})
  ];
}

/**
 * function getDistanceByPlayer(coordinate, player)
 *
 * @param {Object} coordinate
 * @param {int} player
 */
export function getDistanceByPlayer(coordinate, player) {
  return coordinate.player === player ? OWNED_DISTANCE : DISCARD_DISTANCE;
}
