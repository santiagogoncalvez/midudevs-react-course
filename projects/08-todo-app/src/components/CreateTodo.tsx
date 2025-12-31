import { useState } from 'react';
import type { TodoTitle } from '../types';

interface Props {
  saveTodo: (title: TodoTitle) => void;
}

const CreateTodo = ({ saveTodo }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveTodo({ title: inputValue });
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={() => {}}
        placeholder="¿Qué quieres hacer?"
        autoFocus
      />
    </form>
  );
};

export default CreateTodo;
