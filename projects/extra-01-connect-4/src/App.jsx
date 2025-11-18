import { useGameState } from './hooks/useGameState.jsx';

import WinnerModal from './Components/WinnerModal.jsx';
import Game from './Components/Game.jsx';
import StartAgainButton from './Components/StartAgainButton';
import Turn from './Components/Turn.jsx';

import { TURNS, BOARD_SIZE } from './constants.js';

function App() {
  const [{ board, turn, winner }, { resetGame, updateBoard }] = useGameState(
    Array(BOARD_SIZE.rows * BOARD_SIZE.columns).fill(null),
    TURNS.X,
    null
  );

  return (
    <main className="board">
      <h1>Connect 4</h1>

      <StartAgainButton resetGame={resetGame}>
        Empezar de nuevo
      </StartAgainButton>

      <Game board={board} updateBoard={updateBoard} />

      <Turn turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
