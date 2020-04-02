import { FIRST_PLAYER_VALUE } from "./player";
import { getAllNeighborsByPlayer, getGraphFromCoordinates } from "./graph";

describe("Graph generation", () => {
  it("should generate graph with player and start/end coordinates", () => {
    const coordinates = [
      { id: 1, x: 0, y: 0, player: 1 },
      { id: 2, x: 1, y: 0, player: 1 },
      { id: 3, x: 2, y: 0, player: 0 },
      { id: 4, x: 0, y: 1, player: 0 },
      { id: 5, x: 1, y: 1, player: 0 },
      { id: 6, x: 2, y: 1, player: 0 },
      { id: 7, x: 0, y: 2, player: 0 },
      { id: 8, x: 1, y: 2, player: 0 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    const graph = getGraphFromCoordinates(coordinates, FIRST_PLAYER_VALUE);
    const expectedGraph = {
      0: { 1: 1 },
      1: { 2: 1 },
      2: { 1: 1 },
      3: { 10: 1 },
      6: { 10: 1 },
      9: { 10: 1 }
    };

    expect(graph).toEqual(expectedGraph);
  });

  it("should get the player vertex", () => {
    const coordinates = [
      { id: 1, x: 0, y: 0, player: 1 },
      { id: 2, x: 1, y: 0, player: 1 },
      { id: 3, x: 2, y: 0, player: 1 },
      { id: 4, x: 0, y: 1, player: 0 },
      { id: 5, x: 1, y: 1, player: 0 },
      { id: 6, x: 2, y: 1, player: 0 },
      { id: 7, x: 0, y: 2, player: 0 },
      { id: 8, x: 1, y: 2, player: 0 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    const graph = getAllNeighborsByPlayer(coordinates, FIRST_PLAYER_VALUE);
    const expectedGraph = { 1: { 2: 1 }, 2: { 1: 1, 3: 1 }, 3: { 2: 1 } };

    expect(graph).toEqual(expectedGraph);
  });
});
