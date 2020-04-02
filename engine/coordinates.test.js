import { getCoordinatesFromGrid, getCoordinate } from "./coordinates";

describe("Coordinates management", () => {
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

    expect(expectedCoordinates).toEqual(coordinates);
  });

  it("should get a coordinate based on x and y", () => {
    const coordinates = [{ id: 1, x: 0, y: 0, player: 1 }];

    const coordinate = getCoordinate(coordinates, 0, 0);
    const expectedCoordinate = { id: 1, x: 0, y: 0, player: 1 };

    expect(expectedCoordinate).toEqual(coordinate);
  });
});
