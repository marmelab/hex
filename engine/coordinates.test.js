import { getCoordinatesFromGrid } from "./coordinates";

describe("Coordinates generation", () => {
  it("should generate a set of coordinates", () => {
    const grid = [1, 2, 0, 0, 0, 0, 0, 0, 0];

    const coordinates = getCoordinatesFromGrid(grid);
    const expectedCoordinates = [
      { id: 1, x: 0, y: 0, player: 1 },
      { id: 2, x: 1, y: 0, player: 2 },
      { id: 3, x: 2, y: 0, player: 0 },
      { id: 4, x: 0, y: 1, player: 0 },
      { id: 5, x: 1, y: 1, player: 0 },
      { id: 6, x: 2, y: 1, player: 0 },
      { id: 7, x: 0, y: 2, player: 0 },
      { id: 8, x: 1, y: 2, player: 0 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    expect(coordinates).toEqual(expectedCoordinates);
  });
});
