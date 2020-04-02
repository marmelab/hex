/*
 * function getCoordinatesFromGrid(grid)
 *
 * parameter :
 *  - grid: Array containing all played moves (indexed)
 *
 * This function transforms a grid into an array of coordinates.
 *
 * id starts at 1.
 * x and y is respectively the x and y value of the coordinate.
 *
 * e.g.
 * [
 * { id:1, x:0, y:0, player: 1 },
 * { id:2, x:0, y:0, player: 2 }
 * ...
 * ]
 */
export function getCoordinatesFromGrid(grid) {
  const length = grid.length;
  const size = Math.sqrt(length);

  let x = 0;
  let y = 0;

  return grid.map(function(player, index) {
    const coordinate = { id: index + 1, x, y, player };

    // @todo: Try to use modulo operator to remove x/y mutables.
    if (y == size - 1) {
      y = 0;
      x++;
    } else {
      y++;
    }

    return coordinate;
  });
}

/**
 * function getCoordinate(coordinates, x, y)
 *
 * Filters coordinates to get back the coordinate who matches with x and y value.
 *
 * @param {array} coordinates
 * @param {int} x
 * @param {int} y
 */
export function getCoordinate(coordinates, x, y) {
  return coordinates.find(function(coordinate) {
    if (coordinate.x === x && coordinate.y === y) {
      return coordinate;
    }
  });
}
