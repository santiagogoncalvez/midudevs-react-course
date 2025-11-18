const StartAgainButton = ({ resetGame, children }) => {
  return <button onClick={resetGame}>{children}</button>;
};

export default StartAgainButton;
