import type { TodoId, Todo as TodoType } from '../types';

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({
    id,
    completed,
  }: Pick<TodoType, 'id' | 'completed'>) => void;
}

const Todo = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleted,
}: Props) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCompleted({ id, completed: event.target.checked });
  };

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />

      <label>{title}</label>

      <button
        className="destroy"
        onClick={() => {
          onRemoveTodo({ id });
        }}
      ></button>
    </div>
  );
};

export default Todo;
