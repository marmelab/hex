import { FIRST_PLAYER_VALUE, SECOND_PLAYER_VALUE } from "./player";
import {
  getNeighbors,
  getNeighborsOfStartVertex,
  getStartIds,
  getEndIds,
  getAutoLinkedNeighbors
} from "./neighbors";

describe("Neighbors finder", () => {
  it("should get all neighbors for a coordinate", () => {
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

    const neighbors = getNeighbors(
      coordinates,
      { id: 5, x: 1, y: 1, player: 1 },
      FIRST_PLAYER_VALUE
    );
    const expectedNeighbors = { 2: 1, 3: 1, 4: 1, 6: 1, 7: 1, 8: 1 };

    expect(neighbors).toEqual(expectedNeighbors);
  });

  it("should get all id for a start vertex ", () => {
    const coordinates = [
      { id: 1, x: 0, y: 0, player: 1 },
      { id: 2, x: 1, y: 0, player: 0 },
      { id: 3, x: 2, y: 0, player: 0 },
      { id: 4, x: 0, y: 1, player: 1 },
      { id: 5, x: 1, y: 1, player: 0 },
      { id: 6, x: 2, y: 1, player: 0 },
      { id: 7, x: 0, y: 2, player: 0 },
      { id: 8, x: 1, y: 2, player: 0 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    const neighbors = getStartIds(coordinates, FIRST_PLAYER_VALUE);
    const expectedStartNeighbors = [1, 4, 7];

    expect(neighbors).toEqual(expectedStartNeighbors);

    const neighborsSecondPlayer = getStartIds(coordinates, SECOND_PLAYER_VALUE);
    const expectedStartNeighborsSecondPlayer = [1, 2, 3];

    expect(neighborsSecondPlayer).toEqual(expectedStartNeighborsSecondPlayer);
  });

  it("should get all id for an end vertex", () => {
    const coordinates = [
      { id: 1, x: 0, y: 0, player: 0 },
      { id: 2, x: 1, y: 0, player: 0 },
      { id: 3, x: 2, y: 0, player: 0 },
      { id: 4, x: 0, y: 1, player: 1 },
      { id: 5, x: 1, y: 1, player: 0 },
      { id: 6, x: 2, y: 1, player: 0 },
      { id: 7, x: 0, y: 2, player: 0 },
      { id: 8, x: 1, y: 2, player: 0 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    const neighbors = getEndIds(coordinates, FIRST_PLAYER_VALUE);
    const expectedEndNeighbors = [3, 6, 9];

    expect(neighbors).toEqual(expectedEndNeighbors);

    const neighborsSecondPlayer = getEndIds(coordinates, SECOND_PLAYER_VALUE);
    const expectedEndNeighborsSecondPlayer = [7, 8, 9];

    expect(neighborsSecondPlayer).toEqual(expectedEndNeighborsSecondPlayer);
  });

  it("should get all neighbors for a start vertex", () => {
    const coordinates = [
      { id: 1, x: 0, y: 0, player: 1 },
      { id: 2, x: 1, y: 0, player: 0 },
      { id: 3, x: 2, y: 0, player: 0 },
      { id: 4, x: 0, y: 1, player: 1 },
      { id: 5, x: 1, y: 1, player: 0 },
      { id: 6, x: 2, y: 1, player: 0 },
      { id: 7, x: 0, y: 2, player: 0 },
      { id: 8, x: 1, y: 2, player: 0 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    const neighbors = getNeighborsOfStartVertex(
      coordinates,
      FIRST_PLAYER_VALUE
    );
    const expectedStartNeighbors = { 0: { 1: 1, 4: 1 } };

    expect(neighbors).toEqual(expectedStartNeighbors);
  });

  it("should get all autolinked neighbors", () => {
    const coordinates = [
      { id: 1, x: 0, y: 0, player: 1 },
      { id: 2, x: 1, y: 0, player: 0 },
      { id: 3, x: 2, y: 0, player: 0 },
      { id: 4, x: 0, y: 1, player: 1 },
      { id: 5, x: 1, y: 1, player: 0 },
      { id: 6, x: 2, y: 1, player: 0 },
      { id: 7, x: 0, y: 2, player: 0 },
      { id: 8, x: 1, y: 2, player: 0 },
      { id: 9, x: 2, y: 2, player: 0 }
    ];

    const autoLinkedNeighborsFirstPlayer = getAutoLinkedNeighbors(
      coordinates,
      FIRST_PLAYER_VALUE
    );

    const expectedAutoLinkedNeighborsFirstPlayer = {
      3: { 10: 1 },
      6: { 10: 1 },
      9: { 10: 1 }
    };

    expect(autoLinkedNeighborsFirstPlayer).toEqual(
      expectedAutoLinkedNeighborsFirstPlayer
    );

    const autoLinkedNeighborsSecondPlayer = getAutoLinkedNeighbors(
      coordinates,
      SECOND_PLAYER_VALUE
    );

    const expectedAutoLinkedSecondPlayer = {
      7: { 10: 1 },
      8: { 10: 1 },
      9: { 10: 1 }
    };
    expect(autoLinkedNeighborsSecondPlayer).toEqual(
      expectedAutoLinkedSecondPlayer
    );
  });
});
