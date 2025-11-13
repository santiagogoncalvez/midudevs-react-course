import { useState } from 'react';
import confetti from 'canvas-confetti';

import { checkWinnerFrom, checkEndGame } from '../logic/board.js';
import { TURNS } from '../constants';
import { saveGame, resetGameStorage } from '../storage/index.js';

export const useGameState = (
  boardInit = Array(9).fill(null),
  turnInit = TURNS.X,
  winnerInit = null
) => {
  //* Los useSates() y hooks siempre deben estár en el cuerpo de los componentes
  //! No pueden estar dentro de un if, while, un loop, etc.
  // React guarda la posición de cada useState() en un array interno en memoria, entonces si se ponen en condicionales u otras sentencias se pierden las posiciones

  //* Este patrón se llama lazy initialization (inicialización perezosa).
  // React no ejecuta la función inmediatamente. Guarda una referencia a esa función y solo la llama una vez, en el montaje, para obtener el valor inicial. Después, en renders siguientes, React ni la vuelve a tocar.

  //Esta callback debe devolver el valor con el que se quiere inicializar el estado
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

  // La acción de reseteo de cualquier tipo (formularios, juegos, etc) representa setear todos los valores de estado a sus valores iniciales.
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // TODO: poner la función del modulo "storage/index.js" para resetear
    resetGameStorage();
  };

  const updateBoard = (index) => {
    // No se actualiza la posición si tiene algo
    if (board[index] || winner) return;

    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Actualizar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    //* Las actualizaciones de estado en React son ASÍNCRONAS
    setTurn(newTurn);

    // Guardar acá partida
    // TODO: poner la función del modulo "storage/index.js" para guardar
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
