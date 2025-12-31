import { useState } from 'react';
import type { Todo as TodoType, TodoId } from '../types';
import Todo from './Todo';
import FormInput from './FormInput';

interface Props {
  todo: TodoType;
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({
    id,
    completed,
  }: Pick<TodoType, 'id' | 'completed'>) => void;
  onModifyTodo: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void;
}

const TodoItem = ({
  todo,
  onRemoveTodo,
  onToggleCompleted,
  onModifyTodo,
}: Props) => {
  const [isModifyTodo, setIsModifyTodo] = useState(false);
  const handleModifyTodo = (value: string) => {
    if (!value) {
      onRemoveTodo({ id: todo.id });
      return;
    }

    onModifyTodo({
      id: todo.id,
      title: value,
    });
    setIsModifyTodo(false);
  };

  return (
    <li
      key={todo.id}
      className={`${todo.completed ? 'completed ' : ''}${isModifyTodo ? 'editing' : ''}`}
      onDoubleClick={() => {
        setIsModifyTodo(true);
      }}
    >
      <Todo
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
        onRemoveTodo={onRemoveTodo}
        onToggleCompleted={onToggleCompleted}
      />

      <FormInput
        className="edit"
        inputValueInit={todo.title}
        onSubmit={handleModifyTodo}
        isFocus={isModifyTodo}
        onBlur={() => {
          setIsModifyTodo(false);
        }}
      />
    </li>
  );
};

export default TodoItem;
