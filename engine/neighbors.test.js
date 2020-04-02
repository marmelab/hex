import { FIRST_PLAYER_VALUE } from "./player";
import { getNeighborsForVertex } from "./neighbors";

describe("Neighbors finder", () => {
  it("should get all neighbors for a vertex", () => {
    const coordinates = [
      { id: 1, x: 0, y: 0, player: 0 },
      { id: 2, x: 1, y: 0, player: 1 },
      { id: 3, x: 2, y: 0, player: 1 },
      { id: 4, x: 0, y: 1, player: 1 },
      { id: 5, x: 1, y: 1, player: 1 },
      { id: 6, x: 2, y: 1, player: 1 },
      { id: 7, x: 0, y: 2, player: 1 },
      { id: 8, x: 1, y: 2, player: 1 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    const neighbors = getNeighborsForVertex(coordinates, 5, FIRST_PLAYER_VALUE);
    const expectedNeighbors = [{ 2: 1, 3: 1, 4: 1, 6: 1, 7: 1, 8: 1 }];

    expect(neighbors).toEqual(expectedNeighbors);
  });
});
