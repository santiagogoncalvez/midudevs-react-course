import { useEffect, useReducer, useRef } from 'react';
import type { Todo as TodoType, TodoId, TodoTitle, ListOfTodos } from '../types';

import { todosReducer } from '../redurer/todosReducer';
import { getTodoData, updateTodoData } from '../services/getTodoData';

const todosInit: ListOfTodos = [];

export const useTodos = () => {
  const [todos, dispatchTodos] = useReducer(todosReducer, todosInit);
  const isFirstRender = useRef(true);

  useEffect(() => {
    getTodoData()
      .then((todos) => dispatchTodos({ type: 'SET_TODOS', payload: todos }))
      .catch((error) => console.error('Error cargando datos:', error));
  }, []);

  // Actualizar la data en el storage remoto cada vez que cambia 'todos'
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    updateTodoData(todos).catch(console.error);
  }, [todos]);

  const handleAddTodo = ({ title }: TodoTitle) => {
    dispatchTodos({ type: 'ADD_TODO', payload: { title } });
  };

  const handleRemove = ({ id }: TodoId) => {
    dispatchTodos({ type: 'REMOVE_TODO', payload: { id } });
  };

  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoType, 'id' | 'completed'>) => {
    dispatchTodos({
      type: 'CHECK_COMPLETED_TODO',
      payload: { id, completed },
    });
  };

  const handleRemoveAllCompleted = () => {
    dispatchTodos({ type: 'REMOVE_ALL_COMPLETED_TODOS' });
  };

  const handleModifyTodo = ({ id, title }: Pick<TodoType, 'id' | 'title'>) => {
    dispatchTodos({
      type: 'MODIFY_TODO',
      payload: { id, title },
    });
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return {
    todos,
    handleAddTodo,
    handleRemove,
    handleCompleted,
    handleRemoveAllCompleted,
    handleModifyTodo,
    activeCount,
    completedCount,
  };
};
