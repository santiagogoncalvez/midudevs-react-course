import { WINNER_COMBOS } from '../constants';

export const checkWinnerFrom = (boardToCheck) => {
  // Se revisan todas las combinaciones ganadoras para ver si X u O ganó.
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  //Si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  // Se revisa si hay un empate, que sucede cuando no hay más espacios vacíos en el tablero
  return newBoard.every((square) => square != null);
};
