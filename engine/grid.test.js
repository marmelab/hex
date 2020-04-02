import { generateEmptyGrid } from "./grid";

describe("Grid generation", () => {
  it("should generate an empty grid", () => {
    const grid = generateEmptyGrid(3);
    expect([0, 0, 0, 0, 0, 0, 0, 0, 0]).toEqual(grid);
  });
});
