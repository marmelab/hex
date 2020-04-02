import { getGraphFromCoordinates } from "./graph";
import { getCoordinatesFromGrid } from "./coordinates";

export const START_ID = "0";

var dijkstra = require("dijkstrajs");
var find_path = dijkstra.find_path;

/**
 * This function looks for a path into the graph generated from a grid.
 *
 * @param {[]} grid
 * @param {int} player
 */
export function isWon(grid, player) {
  const coordinates = getCoordinatesFromGrid(grid);
  const graph = getGraphFromCoordinates(coordinates, player);
  const endId = coordinates.length + 1;

  try {
    find_path(graph, START_ID, endId);
    return true;
  } catch (error) {
    return false;
  }
}
