import { SortBy, type Users } from '../types.d';

import {
  Table,
  Avatar,
  // Button,
  UnstyledButton,
  Group,
  Text,
} from '@mantine/core';

interface Props {
  users: Users;
  showColors: boolean;
  deleteUser: (email: string) => void;
  changeSorting: (sort: SortBy) => void;
}

export function UsersList({
  users,
  showColors,
  // deleteUser,
  changeSorting,
}: Props) {
  return (
    <Table
      verticalSpacing="sm"
      striped={showColors}
      highlightOnHover
      withTableBorder
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Foto</Table.Th>

          <Table.Th>
            <UnstyledButton onClick={() => changeSorting(SortBy.NAME)}>
              <Group gap="xs">
                <Text fw={700} size="sm">
                  Nombre
                </Text>
              </Group>
            </UnstyledButton>
          </Table.Th>

          <Table.Th>
            <UnstyledButton onClick={() => changeSorting(SortBy.LAST)}>
              <Group gap="xs">
                <Text fw={700} size="sm">
                  Apellido
                </Text>
              </Group>
            </UnstyledButton>
          </Table.Th>

          <Table.Th>
            <UnstyledButton onClick={() => changeSorting(SortBy.COUNTRY)}>
              <Group gap="xs">
                <Text fw={700} size="sm">
                  País
                </Text>
              </Group>
            </UnstyledButton>
          </Table.Th>

          {/* <Table.Th>Acciones</Table.Th> */}
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody className={showColors ? 'table--showColors' : ''}>
        {users.map((user) => (
          <Table.Tr key={user.email}>
            <Table.Td>
              <Avatar src={user.picture.thumbnail} radius="xl" size="sm" />
            </Table.Td>

            <Table.Td align="left">{user.name.first}</Table.Td>

            <Table.Td align="left">{user.name.last}</Table.Td>

            <Table.Td align="left">{user.location.country}</Table.Td>
            
            {/*
            <Table.Td align="left">
               <Button
                variant="light"
                color="red"
                size="xs"
                onClick={() => deleteUser(user.email)}
              >
                Borrar
              </Button>
            </Table.Td>
            */}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
