const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
  updateColumnInd = () =>{},
}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);
  };

  const handleMouseEnter = () => {
    updateColumnInd(index);
  };

  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
};

export default Square;
