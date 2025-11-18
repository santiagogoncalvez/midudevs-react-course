import { BOARD_SIZE, CANT_CONNECT } from '../constants';



export const checkWinnerFrom = (boardToCheck) => {
  // Recorrer filas
  for (let r = 0; r < BOARD_SIZE.rows; r++) {
    let lastElement = null;
    let cantMatches = 0;

    for (let c = 0; c < BOARD_SIZE.columns; c++) {
      let index = r * BOARD_SIZE.columns + c;
      let cell = boardToCheck[index];

      if (!cell) {
        cantMatches = 0;
        lastElement = null;
        continue;
      }

      if (cell === lastElement) {
        cantMatches++;
      } else {
        cantMatches = 1;  // reiniciar la racha
        lastElement = cell;
      }

      if (cantMatches === CANT_CONNECT) return cell;
    }
  }

  // Recorrer columnas
  for (let c = 0; c < BOARD_SIZE.columns; c++) {
    let lastElement = null;
    let cantMatches = 0;

    for (let r = 0; r < BOARD_SIZE.rows; r++) {
      let index = r * BOARD_SIZE.columns + c;
      let cell = boardToCheck[index];

      if (!cell) {
        cantMatches = 0;
        lastElement = null;
        continue;
      }

      if (cell === lastElement) {
        cantMatches++;
      } else {
        cantMatches = 1;  // reiniciar la racha
        lastElement = cell;
      }

      if (cantMatches === CANT_CONNECT) return cell;
    }
  }

  // Celdas diagonales hacia la derecha
  for (let i = 0; i < BOARD_SIZE.rows; i++) {
    let lastElement = null;
    let cantMatches = 0;
    let r = i;
    let c = 0;
    while (r >= 0) {
      let index = r * BOARD_SIZE.columns + c;
      let cell = boardToCheck[index];

      if (!cell) {
        cantMatches = 0;
        lastElement = null;
        r--;
        c++;
        continue;
      }

      if (cell === lastElement) {
        cantMatches++;
      } else {
        cantMatches = 1;  // reiniciar la racha
        lastElement = cell;
      }

      if (cantMatches === CANT_CONNECT) return cell;

      r--;
      c++;
    }
  }

  for (let i = 1; i < BOARD_SIZE.columns; i++) {
    let lastElement = null;
    let cantMatches = 0;
    let c = i;
    let r = BOARD_SIZE.rows - 1;
    while (r >= 0 && c < BOARD_SIZE.columns) {
      let index = r * BOARD_SIZE.columns + c;
      let cell = boardToCheck[index];

      if (!cell) {
        cantMatches = 0;
        lastElement = null;
        r--;
        c++;
        continue;
      }

      if (cell === lastElement) {
        cantMatches++;
      } else {
        cantMatches = 1;  // reiniciar la racha
        lastElement = cell;
      }

      if (cantMatches === CANT_CONNECT) return cell;
      r--;
      c++;
    }
  }

  // Celdas diagonales a la izquierda
  for (let i = 0; i < BOARD_SIZE.rows; i++) {
    let lastElement = null;
    let cantMatches = 0;
    let r = i;
    let c = BOARD_SIZE.columns - 1;
    while (r >= 0) {
      let index = r * BOARD_SIZE.columns + c;
      let cell = boardToCheck[index];

      if (!cell) {
        cantMatches = 0;
        lastElement = null;
        r--;
        c--;
        continue;
      }

      if (cell === lastElement) {
        cantMatches++;
      } else {
        cantMatches = 1;  // reiniciar la racha
        lastElement = cell;
      }

      if (cantMatches === CANT_CONNECT) return cell;

      r--;
      c--;
    }
  }

  for (let i = BOARD_SIZE.columns - 2; i >= 0; i--) {
    let lastElement = null;
    let cantMatches = 0;
    let c = i;
    let r = BOARD_SIZE.rows - 1;
    while (r >= 0 && c >= 0) {
      let index = r * BOARD_SIZE.columns + c;
      let cell = boardToCheck[index];

      if (!cell) {
        cantMatches = 0;
        lastElement = null;
        r--;
        c--;
        continue;
      }

      if (cell === lastElement) {
        cantMatches++;
      } else {
        cantMatches = 1;  // reiniciar la racha
        lastElement = cell;
      }

      if (cantMatches === CANT_CONNECT) return cell;

      r--;
      c--;
    }
  }


  //Si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  // Se revisa si hay un empate, que sucede cuando no hay más espacios vacíos en el tablero
  return newBoard.every((square) => square != null);
};
