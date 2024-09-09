import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights Out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, numMoves = 10 }) {
  const [board, setBoard] = useState(createRandomBoard(nrows, ncols, numMoves));

  useEffect(() => {
    setBoard(createRandomBoard(nrows, ncols, numMoves));
  }, [nrows, ncols, numMoves]);

  /** create a base board nrows high/ncols wide, each cell initially off */
  function createBaseBoard(nrows, ncols) {
    return Array.from({ length: nrows }, () => Array(ncols).fill(false));
  }

  /** apply a move that flips the cell and its neighbors */
  function applyMove(board, y, x) {
    const nrows = board.length;
    const ncols = board[0].length;
    
    const flipCell = (y, x) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    };

    flipCell(y, x); // Flip the selected cell
    flipCell(y - 1, x); // Flip the cell above
    flipCell(y + 1, x); // Flip the cell below
    flipCell(y, x - 1); // Flip the cell to the left
    flipCell(y, x + 1); // Flip the cell to the right
  }

  /** generate a random solvable board by applying moves to a base board */
  function createRandomBoard(nrows, ncols, numMoves) {
    const board = createBaseBoard(nrows, ncols);
    
    // Apply a series of random moves
    for (let i = 0; i < numMoves; i++) {
      const y = Math.floor(Math.random() * nrows);
      const x = Math.floor(Math.random() * ncols);
      applyMove(board, y, x);
    }
    
    return board;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // Make a (deep) copy of the old board
      const boardCopy = oldBoard.map(row => [...row]);

      // Flip this cell and the cells around it
      applyMove(boardCopy, y, x);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div className="winning-message">You Won!</div>;
  }

  // create table board
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
