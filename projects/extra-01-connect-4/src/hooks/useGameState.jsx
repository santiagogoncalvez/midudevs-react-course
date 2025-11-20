import { useState } from 'react';
import confetti from 'canvas-confetti';

import { checkWinnerFrom, checkEndGame } from '../logic/board.js';
import { TURNS, BOARD_SIZE } from '../constants.js';
import { saveGame, resetGameStorage } from '../storage/index.js';

export const useGameState = (
  boardInit = Array(BOARD_SIZE.rows * BOARD_SIZE.columns).fill(null),
  turnInit = TURNS.X,
  winnerInit = null
) => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return boardInit;
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn');
    return turnFromStorage ?? turnInit;
  });
  // null: no hay ganador. false: empate
  const [winner, setWinner] = useState(winnerInit);

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE.rows * BOARD_SIZE.columns).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };

  const getInsertPos = (board, rows, columns, columnToInsert) => {
    for (let r = rows - 1; r >= 0; r--) {
      let index = r * columns + columnToInsert;
      // console.log(board[index]);
      if (!board[index]) return index;
    }
    // Si todas las posiciones están llenas
    return -1;
  };

  const updateBoard = (index) => {
    // TODO: desarrollar lógica para detectear las columnas y no la posición exacta, para insertar al final de la columna clickeada el elemento.

    const columnToInsert = index % BOARD_SIZE.columns;

    const indexToInsert = getInsertPos(
      board,
      BOARD_SIZE.rows,
      BOARD_SIZE.columns,
      columnToInsert
    );

    // No se actualiza la posición si tiene algo
    if (indexToInsert === -1 || winner) return;

    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[indexToInsert] = turn;
    setBoard(newBoard);

    // Actualizar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    //* Las actualizaciones de estado en React son ASÍNCRONAS
    setTurn(newTurn);

    // Guardar acá partida
    saveGame({ board: newBoard, turn: newTurn });

    // Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) setWinner(false); // Empate
  };

  return [
    { board, turn, winner },
    { resetGame, updateBoard },
  ];
};
