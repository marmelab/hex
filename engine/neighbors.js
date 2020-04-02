import { getCoordinate } from "./coordinates";
import { SECOND_PLAYER_VALUE, FIRST_PLAYER_VALUE } from "./player";
import _ from "lodash";

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
 * function getNeighbors(coordinates, coordinate, player)
 *
 * This function gets all neighbors for a coordinate.
 *
 * @param {array} coordinates
 * @param {Object} coordinate
 * @param {int} player
 */
export function getNeighbors(coordinates, coordinate, player) {
  const neighbors = DIRECTIONS.map(function(direction) {
    const xNeighbor = coordinate.x + direction.x;
    const yNeighbor = coordinate.y + direction.y;

    const neighborCoordinate = getCoordinate(coordinates, xNeighbor, yNeighbor);

    if (neighborCoordinate) {
      const distance = getDistanceByPlayer(neighborCoordinate, player);
      return { [neighborCoordinate.id]: distance };
    }
  }).filter(function(neighbor) {
    if (neighbor && Object.values(neighbor)[0] === OWNED_DISTANCE) {
      return neighbor;
    }
  });
  return _.merge(...neighbors);
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

/**
 * function getNeighborsOfStartVertex(coordinates, player)
 *
 * This functions checks if start vertex has neighbors.
 *
 * @param {[]} coordinates
 * @param {int} player
 */
export function getNeighborsOfStartVertex(coordinates, player) {
  const startNeighborsIds = getStartIds(coordinates, player);

  return {
    "0": getNeighborsByNeigborIds(coordinates, startNeighborsIds, player)
  };
}

/**
 * function getNeighborsOfEndVertex(coordinates, player)
 *
 * This functions checks if end vertex has neighbors.
 *
 * @param {[]} coordinates
 * @param {int} player
 */
export function getNeighborsOfEndVertex(coordinates, player) {
  const endNeighborsIds = getEndIds(coordinates, player);
  const endId = coordinates.length + 1;

  return {
    [endId]: getNeighborsByNeigborIds(coordinates, endNeighborsIds, player)
  };
}

export function getAutoLinkedNeighbors(coordinates, player) {
  const endNeighborsIds = getEndIds(coordinates, player);
  const endId = coordinates.length + 1;

  return coordinates
    .filter(function(coordinate) {
      if (_.indexOf(endNeighborsIds, coordinate.id) >= 0) {
        return coordinate;
      }
    })
    .map(function(coordinate) {
      return { [coordinate.id]: { [endId]: 1 } };
    })
    .reduce(function(graph, neighbors) {
      return Object.assign(graph, neighbors);
    });
}

/**
 * This functions returns all coordinates ids for the start vertex.
 * Each player have different ids.
 *
 * @param {[]} coordinates
 */
export function getStartIds(coordinates, player) {
  const length = coordinates.length;
  if (player === FIRST_PLAYER_VALUE) {
    const start = 1;
    const end = length;
    const step = Math.sqrt(length);

    return _.range(start, end, step);
  } else if (player === SECOND_PLAYER_VALUE) {
    const start = 1;
    const end = Math.sqrt(length) + 1;
    const step = 1;

    return _.range(start, end, step);
  }
}

/**
 * This functions returns all coordinates ids for the end vertex.
 * Each player have different ids.
 *
 * @param {[]} coordinates
 */
export function getEndIds(coordinates, player) {
  const length = coordinates.length;
  const sqrt = Math.sqrt(length);

  if (player === FIRST_PLAYER_VALUE) {
    const start = sqrt;
    const end = length + 1;
    const step = sqrt;

    return _.range(start, end, step);
  } else if (player === SECOND_PLAYER_VALUE) {
    const start = length - sqrt + 1;
    const end = length + 1;
    const step = 1;

    return _.range(start, end, step);
  }
}

/**
 * This function returns all neighbors found into the ids array.
 *
 * @param {[]} coordinates
 * @param {[]} ids
 * @param {int} player
 */
export function getNeighborsByNeigborIds(coordinates, ids, player) {
  const neighbors = coordinates
    .filter(function(coordinate) {
      if (ids.indexOf(coordinate.id) >= 0 && coordinate.player === player) {
        return coordinate;
      }
    })
    .flat()
    .map(function(coordinate) {
      return { [coordinate.id]: getDistanceByPlayer(coordinate, player) };
    });

  if (neighbors.length >= 1) {
    return neighbors.reduce(function(neighbors, neighbor) {
      return Object.assign(neighbors, neighbor);
    });
  }
}
