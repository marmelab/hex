import { FIRST_PLAYER_VALUE, SECOND_PLAYER_VALUE } from "./player";

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
  const endVertexId = coordinates.length + 1;

  const playerVertex = getVertexByPlayer(coordinates, player);
  return [{ [START_VERTEX_ID]: [] }, { [endVertexId]: [] }, playerVertex].flat();
}

/**
 * function getVertexByPlayer(coordinates, player)
 * 
 * This function get back all vertex for a player (parameter).
 * 
 * @param {array} coordinates 
 * @param {int} player 
 */
export function getVertexByPlayer(coordinates, player) {
  const playerCoordinates = coordinates.filter(function(coordinate) {
    return coordinate.player == player;
  });

  return playerCoordinates.map(function(coordinate) {
    return { [coordinate.id]: [] };
  });
}
