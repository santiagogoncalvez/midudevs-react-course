import { useCallback, useState } from 'react';
import { UserContext } from './userCreateContext';

export function UserContextProvider({ children }) {
  const [name, setName] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const updateUser = useCallback(({ name, isLogged }) => {
    setName(name);
    setIsLogged(isLogged);
  }, []);

  // En react 19 ya no se tiene que especificar el .privider de los providers de los context
  return (
    <UserContext value={{ name, isLogged, updateUser }}>{children}</UserContext>
  );
}
