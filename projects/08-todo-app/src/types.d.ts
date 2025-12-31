import type { TODO_FILTERS } from "./consts";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoId = Pick<Todo, 'id'>;
export type TodoTitle = Pick<Todo, 'title'>;
export type TodoCompleted = Pick<Todo, 'completed'>;

export type ListOfTodos = Todo[] | [];

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];


export type TodoAction =
  | { type: 'SET_TODOS'; payload: ListOfTodos }
  | { type: 'ADD_TODO'; payload: TodoTitle }
  | { type: 'REMOVE_TODO'; payload: TodoId }
  | {
      type: 'CHECK_COMPLETED_TODO';
      payload: Pick<Todo, 'id' | 'completed'>;
    }
  | { type: 'REMOVE_ALL_COMPLETED_TODOS' }
  | { type: 'MODIFY_TODO'; payload: Pick<Todo, 'id' | 'title'> };