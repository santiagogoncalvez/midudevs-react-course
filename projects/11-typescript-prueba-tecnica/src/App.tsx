
import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { SortBy, type APIResults, type User, type Users } from './types.d';
import { UsersList } from './components/UsersList';
import { Group, Button, TextInput, Title, Stack } from '@mantine/core';
import {
  IconSearch,
  IconRefresh,
  IconArrowsSort,
  IconColorPicker,
} from '@tabler/icons-react';

function App() {
  const [users, setUsers] = useState<Users>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUser = useRef<Users>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => setShowColors(!showColors);

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };
  const handleDelete = (email: string) => {
    const filterUsers = users.filter((user) => user.email != email);
    setUsers(filterUsers);
  };

  const handleReset = () => {
    setUsers(originalUser.current);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((response) => response.json())
      .then((result: APIResults) => {
        setUsers(result.results);
        originalUser.current = result.results;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        {/* <h1>Prueba técnica</h1> */}

        <div>
          <Stack mb="xl">
            <Group justify="space-between" align="flex-end">
              {/* Grupo de Acciones */}
              <Group>
                <Button
                  variant={showColors ? 'filled' : 'light'}
                  color="blue"
                  onClick={toggleColors}
                  leftSection={<IconColorPicker size={16} />}
                >
                  Colorear filas
                </Button>

                <Button
                  variant={sorting === SortBy.COUNTRY ? 'filled' : 'light'}
                  color="teal"
                  onClick={toggleSortByCountry}
                  leftSection={<IconArrowsSort size={16} />}
                >
                  {sorting === SortBy.COUNTRY
                    ? 'No ordenar por país'
                    : 'Ordenar por país'}
                </Button>

                <Button
                  variant="outline"
                  color="gray"
                  onClick={handleReset}
                  leftSection={<IconRefresh size={16} />}
                >
                  Resetear estado
                </Button>
              </Group>

              {/* Filtro de búsqueda */}
              <TextInput
                placeholder="Filtra por país..."
                leftSection={<IconSearch size={16} />}
                onChange={(event) =>
                  setFilterCountry(event.currentTarget.value)
                }
                style={{ flex: 1, maxWidth: '300px' }}
              />
            </Group>
          </Stack>
          <UsersList
            users={sortedUsers}
            showColors={showColors}
            deleteUser={handleDelete}
            changeSorting={handleChangeSort}
          />
        </div>
      </div>
  );
}

export default App;
