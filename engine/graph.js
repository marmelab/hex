import {
  getNeighborsOfEndVertex,
  getNeighborsOfStartVertex,
  getNeighbors,
  getAutoLinkedNeighbors
} from "./neighbors";

import _ from "lodash";

const START_VERTEX_ID = 0;

/**
 * function getGraphFromCoordinates(coordinates, player)
 *
 * This function builds the graph for a player.
 * Add players vertex and start/end vertex.
 *
 * @param {array} coordinates
 * @param {int} player
 */
export function getGraphFromCoordinates(coordinates, player) {
  const startNeighbors = getNeighborsOfStartVertex(coordinates, player);
  const endNeighbors = getNeighborsOfEndVertex(coordinates, player);

  const neighbors = getAllNeighborsByPlayer(coordinates, player);
  const autoLinkedNeighbors = getAutoLinkedNeighbors(coordinates, player);

  _.merge(neighbors, autoLinkedNeighbors);

  const graph = Object.assign({}, startNeighbors);
  Object.assign(graph, endNeighbors);
  Object.assign(graph, neighbors);

  return graph;
}

/**
 * function getVertexByPlayer(coordinates, player)
 *
 * This function get back all neighbors for a player (parameter).
 *
 * @param {array} coordinates
 * @param {int} player
 */
export function getAllNeighborsByPlayer(coordinates, player) {
  const playerCoordinates = coordinates.filter(function(coordinate) {
    return coordinate.player == player;
  });

  return playerCoordinates
    .map(function(coordinate) {
      return {
        [coordinate.id]: getNeighbors(coordinates, coordinate, player)
      };
    })
    .reduce(function(graph, neighbors) {
      return Object.assign(graph, neighbors);
    });
}
