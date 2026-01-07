import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';
import { useAppSelector } from '../hooks/store';
import { useUserActions } from '../hooks/useUserActions';
import { CreateModifyUser } from './CreateModifyUser';
import { RemoveIcon } from './Icons';

export function ListOfUsers() {
  const users = useAppSelector((state) => state.users);
  const { removeUser } = useUserActions();

  return (
    <div className="max-w-full">
      <Card className="w-full flex flex-col gap-4">
        <div className="flex justify-between">
          <Title>
            Usuarios
            <Badge style={{ marginLeft: '8px' }}>{users.length}</Badge>
          </Title>

          <CreateModifyUser />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Id</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                    src={`https://unavatar.io/github/${item.github}`}
                    alt={item.name}
                  />
                  {item.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <button type="button" onClick={() => removeUser(item.id)}>
                    <RemoveIcon />
                  </button>
                  <CreateModifyUser userToEdit={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
