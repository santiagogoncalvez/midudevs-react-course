import { useMemo, useState } from 'react';
import './App.css';
import { SortBy, type User } from './types.d';
import { useUsers } from './hooks/useUsers';
import { Button, Title } from '@mantine/core';
import { UsersList } from './components/UsersList';
import FilterSortControls from './components/FilterSortControls';
import Results from './components/Results';

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage, deleteUser } =
    useUsers();

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => setShowColors(!showColors);

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    deleteUser(email);
  };

  const handleReset = () => {
    void refetch();
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setFilterCountry(event.currentTarget.value);
  };

  //* Siempre filtrar primero y después ordenar. Ya que no es óptimo ordenar datos que no se saben si van a estar el final.
  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  // sort() muta el array, así que si es un array de estado hay que hacer siepre el sort sobre una copia.
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div
      className="app"
      style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}
    >
      <Title order={1}>Gestión de Usuarios</Title>

      <div>
        <FilterSortControls
          sorting={sorting}
          toggleColors={toggleColors}
          showColors={showColors}
          toggleSortByCountry={toggleSortByCountry}
          handleReset={handleReset}
          onChangeInput={handleChangeInput}
        />

        <main>
          <Results />

          {users.length > 0 && (
            <UsersList
              users={sortedUsers}
              showColors={showColors}
              deleteUser={handleDelete}
              changeSorting={handleChangeSort}
            />
          )}
          {isLoading && <p>Cargando...</p>}
          {isError && <p>Ha habido un error</p>}
          {!isLoading && !isError && users.length === 0 && (
            <p>No hay usuarios</p>
          )}

          {hasNextPage && !isLoading && !isError && (
            <Button
              style={{ margin: '1em 0em' }}
              variant="outline"
              onClick={() => void fetchNextPage()}
            >
              Cargar más resultados
            </Button>
          )}

          {!hasNextPage && !isLoading && !isError && (
            <p>No hay más resultados</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
