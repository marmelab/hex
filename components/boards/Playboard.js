import React, { useState } from "react";
import Hexagon from "./Hexagon";
import BottomBoard from "./BottomBoard";
import {
  getBoardRatio,
  getHexagonHeight,
  getHexagonWidth,
  calculateLeftPosition,
  calculateTopPosition
} from "./position.js";
import Hud from "../huds/Hud";
import { generateEmptyGrid } from "../../engine/grid";
import { FIRST_PLAYER_VALUE, WINNER_LINE_VALUE } from "../../engine/player";
import { getWinningPath } from "../../engine/game";

function Playboard(props) {
  const size = props.size;

  const boardRatio = getBoardRatio(size);

  const hexagonWidth = getHexagonWidth(size);
  const hexagonHeight = getHexagonHeight(size);

  const [grid, setGrid] = useState(generateEmptyGrid(size));
  const [player, setPlayer] = useState(FIRST_PLAYER_VALUE);
  const [winner, setWinner] = useState(0);

  const handleCellOnPress = (id, player) => {
    if (grid[id] !== 0 || winner) {
      return;
    }
    const updatedGrid = grid.map((hexagon, index) =>
      id === index ? player : hexagon
    );
    setGrid(updatedGrid);

    const winningPath = getWinningPath(updatedGrid, player);

    if (winningPath) {
      setWinner(player);

      const winningGrid = grid.map(function(value, index) {
        if (_.indexOf(winningPath, (index + 1).toString(10)) >= 0) {
          return WINNER_LINE_VALUE;
        }

        return value;
      });

      setGrid(winningGrid);
    }

    setPlayer(player === 1 ? 2 : 1);
  };

  return (
    <>
      <div className="container">
        <BottomBoard
          size={size}
          hexagonHeight={hexagonHeight}
          hexagonWidth={hexagonWidth}
        />

        <div name="grid" className="hexagons-grid">
          {grid.map((value, index) => {
            const rowIndex = index % size;
            const columnIndex = Math.floor(index / size);

            const top = calculateTopPosition(rowIndex, hexagonHeight);
            const left = calculateLeftPosition(
              columnIndex,
              rowIndex,
              hexagonWidth
            );

            return (
              <Hexagon
                onClick={() => handleCellOnPress(index, player)}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${hexagonWidth}%`,
                  height: `${hexagonHeight}%`
                }}
                name={`hexagon_${index}`}
                value={value}
              />
            );
          })}
        </div>
      </div>

      <div className="side">
        <Hud player={player} winner={winner} />
      </div>

      <style jsx>{`
        .container {
          width: 62vw;
          position: relative;
          justify-content: center;
          align-items: center;
          margin: 10vw;
          display: flex;
        }

        .container:after {
          content: "";
          display: block;
          padding-bottom: ${boardRatio * 100}%;
        }

        .hexagons-grid {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .side {
          display: flex;
          width: 25vh;
        }
      `}</style>
    </>
  );
}

export default Playboard;
