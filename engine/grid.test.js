import { generateEmptyGrid } from "./grid";

describe("Grid generation", () => {
  it("should generate an empty grid", () => {
    const grid = generateEmptyGrid(3);
    expect(grid).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});

