import type { Todo as TodoType, ListOfTodos, TodoId } from '../types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TodoItem from './TodoItem';

interface Props {
  todos: ListOfTodos;
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({
    id,
    completed,
  }: Pick<TodoType, 'id' | 'completed'>) => void;
  onModifyTodo: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void;
}

const Todos = ({
  todos,
  onRemoveTodo,
  onToggleCompleted,
  onModifyTodo,
}: Props) => {
  const [parent] = useAutoAnimate();

  return (
    <ul ref={parent} className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          onToggleCompleted={onToggleCompleted}
          onModifyTodo={onModifyTodo}
        />
      ))}
    </ul>
  );
};

export default Todos;
