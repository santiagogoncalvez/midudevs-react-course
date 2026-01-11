import { useUsers } from '../hooks/useUsers';

const Results = () => {
  const { users } = useUsers();

  return <p style={{textAlign:'start'}}>Resultados: {users.length}</p>;
};

export default Results;
