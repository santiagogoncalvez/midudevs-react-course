import { useState } from 'react';

import Square from './Square';
import ColumnIndicator from './ColumnIndicator';

import { BOARD_SIZE } from '../constants.js';

const Game = ({ board, updateBoard }) => {
  const [column, setColumn] = useState(-1);

  const handleColumnInd = (index) => {
    if (index === -1) setColumn(index);
    const currColumn = index % BOARD_SIZE.columns;
    setColumn(currColumn);
  };

  return (
    <section className="game-container">
      <ColumnIndicator currColumn={column} />
      <div
        className="game"
        onMouseLeave={() => {
          handleColumnInd(-1);
        }}
      >
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              updateColumnInd={handleColumnInd}
            >
              {square}
            </Square>
          );
        })}
      </div>
    </section>
  );
};

export default Game;
