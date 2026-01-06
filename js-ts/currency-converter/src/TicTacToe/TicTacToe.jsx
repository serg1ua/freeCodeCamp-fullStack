import { useState } from "react";
import "./styles.css";

const matrix = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const players = {
  PLAYER_X: "X",
  PLAYER_O: "O",
};

function TicTacToe() {
  const [board, setBoard] = useState(matrix);
  const [player, setPlayer] = useState(players.PLAYER_X);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("Next Player: X");

  const handleCellClick = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex] || winner) {
      return;
    }

    const newBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === cellIndex ? player : cell))
    );
    const nextPlayer = player === players.PLAYER_X ? players.PLAYER_O : players.PLAYER_X;

    setBoard(newBoard);
    setPlayer(nextPlayer);
    checkWinner(newBoard, nextPlayer);

    if (newBoard.flat().every((cell) => cell)) {
      setStatus("It's a Draw!");
    }
  };

  const checkWinner = (board, nextPlayer) => {
    const winLines = [
      // Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of winLines) {
      if (line.every((cell) => cell === players.PLAYER_X)) {
        setWinner(players.PLAYER_X);
        setStatus(`Winner: ${players.PLAYER_X}`);
        return;
      }
      if (line.every((cell) => cell === players.PLAYER_O)) {
        setWinner(players.PLAYER_O);
        setStatus(`Winner: ${players.PLAYER_O}`);
        return;
      }
      setStatus(`Next Player: ${nextPlayer}`);
    }
  };

  const resetGame = () => {
    setBoard(matrix);
    setPlayer(players.PLAYER_X);
    setWinner(null);
  };

  return (
    <div className="home-container tic-tac-toe-container">
      <h2 className="ttt-game-title">Tic-Tac-Toe</h2>
      <h3 className="ttt-game-status">{status}</h3>
      <div className="matrix">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <button
                key={cellIndex}
                className="square"
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button id="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToe;
