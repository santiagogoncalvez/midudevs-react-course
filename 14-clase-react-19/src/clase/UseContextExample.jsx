import { use } from 'react';
import { UserContext } from '../context/userCreateContext';

export function UseContextExample({ enabled = true }) {
  if (!enabled) return null;

    // Con react 19 usando 'use' se puede consumir un contexto de forma condicional, lo que el useContext no permite ya que este se rige bajo las reglas de los hooks.
  const { name, isLogged, updateUser } = use(UserContext);

  return (
    <>
      {isLogged && (
        <>
          <p>Hola, {name}</p>
          <button onClick={() => updateUser({ name: null, isLogged: false })}>
            Cerrar sesión
          </button>
        </>
      )}
      {!isLogged && (
        <>
          <p>Bienvenido</p>
          <button onClick={() => updateUser({ name: 'Juan', isLogged: true })}>
            Iniciar sesión
          </button>
        </>
      )}
    </>
  );
}
