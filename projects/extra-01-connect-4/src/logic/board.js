import { BOARD_SIZE, CANT_CONNECT } from '../constants';

export const checkWinnerFrom = (board) => {
  const rows = BOARD_SIZE.rows;
  const cols = BOARD_SIZE.columns;

  const directions = [
    { dr: 0, dc: 1 },   // horizontal →
    { dr: 1, dc: 0 },   // vertical ↓
    { dr: 1, dc: 1 },   // diagonal ↘
    { dr: 1, dc: -1 }   // diagonal ↙
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = board[r * cols + c];
      if (!cell) continue;

      // revisar cada dirección desde esta celda
      for (const { dr, dc } of directions) {
        let count = 1;

        let nr = r + dr;
        let nc = c + dc;

        while (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          board[nr * cols + nc] === cell
        ) {
          count++;
          if (count === CANT_CONNECT) {
            return cell;
          }

          nr += dr;
          nc += dc;
        }
      }
    }
  }

  return null;
};


export const checkEndGame = (newBoard) => {
  // Se revisa si hay un empate, que sucede cuando no hay más espacios vacíos en el tablero
  return newBoard.every((square) => square != null);
};
