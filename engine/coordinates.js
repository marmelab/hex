/*
 * function getCoordinatesFromGrid(grid)
 *
 * parameter :
 *  - grid: Array containing all played moves (indexed)
 *
 * This fucntion transforms a grid into an array of coordinates.
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
  const width = Math.sqrt(length);

  var x = 0;
  var y = 0;

  return grid.map(function(player, index) {
    const coordinate = { id: index + 1, x, y, player };

    if (x == width - 1) {
      x = 0;
      y++;
    } else {
      x++;
    }

    return coordinate;
  });
}
