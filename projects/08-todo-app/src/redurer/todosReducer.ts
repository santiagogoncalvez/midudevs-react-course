import type {
  Todo as TodoType,
  ListOfTodos,
  TodoAction,
} from '../types';

export const todosReducer = (
  state: ListOfTodos,
  action: TodoAction
): ListOfTodos => {
  const { type } = action;

  if (type === 'SET_TODOS') {
    return action.payload;
  }

  if (type === 'ADD_TODO') {
    const { title } = action.payload;
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    return [...state, newTodo];
  }

  if (type === 'REMOVE_TODO') {
    const { id } = action.payload;
    return state.filter((todo) => todo.id != id);
  }

  if (type === 'CHECK_COMPLETED_TODO') {
    const { id, completed } = action.payload;
    const newTodos = state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: completed,
        };
      }

      return todo;
    });

    return newTodos;
  }

  if (type === 'REMOVE_ALL_COMPLETED_TODOS') {
    return state.filter((todo) => !todo.completed);
  }

  if (type === 'MODIFY_TODO') {
    const newTodos = state.map((todo) => {
      const { id, title } = action.payload;

      if (todo.id === id) {
        return {
          id,
          title,
          completed: todo.completed,
        };
      }
      return todo;
    });

    return newTodos;
  }

  return state;
};
