import { useState } from 'react';
import { TODO_FILTERS } from '../consts';
import type { FilterValue, ListOfTodos } from '../types';

interface Props {
  todos: ListOfTodos;
}

export const useFilters = ({ todos }: Props) => {
  const [filterSelected, setFilterSelected] = useState<FilterValue>(() => {
    // 1. Obtenemos los parámetros de la URL directamente al crear el estado
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter') as FilterValue;

    // 2. Si existe en la URL y es válido, lo usamos; si no, usamos el valor por defecto
    return Object.values(TODO_FILTERS).includes(filterParam)
      ? filterParam
      : TODO_FILTERS.ALL;
  });

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter);

    const params = new URLSearchParams(window.location.search);
    params.set('filter', filter);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  };
  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  return { filterSelected, handleFilterChange, filteredTodos };
};
