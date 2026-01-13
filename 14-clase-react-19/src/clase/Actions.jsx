import { useState, useActionState } from 'react';
import { updateName } from '../utils';
import { useFormStatus } from 'react-dom';

const createAction = (updateState) => async (previousState, formData) => {
  const name = formData.get('username');
  const error = await updateName(name);

  if (error) return error;
  updateState(name);
  return null;
};

export function Actions() {
  // useActionState fue agregado en react 19 y sirve para manejar todas las acciones y estados relacionados a un formulario.
  const [result, setResult] = useState(null);
  const updateNameAction = createAction(setResult);
  const [error, submitAction, isPending] = useActionState(updateNameAction);

  return (
    <form action={submitAction}>
      <input
        name="username"
        disabled={isPending}
        placeholder="Ej. Miguel Angel"
      />

      <input type="password" name="secret" defaultValue="1234" />

      <Button />

      {error && <p>❌ {error}</p>}
      {result && !error && <p>✅ El nombre guardado es: {result}</p>}
    </form>
  );
}

function Button() {
    // El useFormStatus sirve para leer el estado de un formulario. Este hook reconoce si el componente que se lo llama esta dentro o envuelto en un formulario y puede acceder a su estado.
  const { pending, data, method, action } = useFormStatus();

  console.log({ pending, data: data?.get('secret'), method, action });

  return (
    <button disabled={pending}>{pending ? 'Cargando...' : 'Actualizar'}</button>
  );
}
