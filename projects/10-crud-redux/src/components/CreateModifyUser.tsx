import {
  Badge,
  Button,
  Dialog,
  DialogPanel,
  TextInput,
  Title,
} from '@tremor/react';
import { useState } from 'react';
import { useUserActions } from '../hooks/useUserActions';
import type { UserWithId } from '../store/users/slice';
import { ModifyIcon } from './Icons';

// Definimos los tipos para mayor claridad
// userToEdit es opcional: si viene, editamos; si no, creamos.
export function CreateModifyUser({
  userToEdit = null,
}: {
  userToEdit?: UserWithId | null;
}) {
  const { addUser, updateUser} = useUserActions(); // Asumo que tienes un updateUser
  const [result, setResult] = useState<'ok' | 'ko' | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isEditing = !!userToEdit;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      github: formData.get('github') as string,
    };

    if (!data.name || !data.email || !data.github) {
      return setResult('ko');
    }

    if (isEditing) {
      updateUser({ id: userToEdit.id, ...data });
    } else {
      addUser(data);
      form.reset();
    }

    setResult('ok');
    // Opcional: cerrar el modal tras éxito tras un breve delay
    // setTimeout(() => {
      setIsOpen(false);
      setResult(null);
    // }, 1500);
  };

  const labelId = isEditing ? 'editing' : 'create';

  return (
    <>
      {isEditing && (
        <button type="button" onClick={() => setIsOpen(true)}>
          <ModifyIcon />
        </button>
      )}
      {!isEditing && (
        <Button onClick={() => setIsOpen(true)}>+ Crear usuario</Button>
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="mt-4">
          <Title className="mb-4">
            {isEditing
              ? `Editando a ${userToEdit.name}`
              : 'Crear nuevo usuario'}
          </Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
            <label
              htmlFor={`input-name-${labelId}`}
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            >
              Name
            </label>
            <TextInput
              id={`input-name-${labelId}`}
              name="name"
              placeholder="Nombre"
              defaultValue={userToEdit?.name || ''}
            />
            <label
              htmlFor={`input-email-${labelId}`}
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            >
              Email
            </label>
            <TextInput
              id={`input-email-${labelId}`}
              name="email"
              placeholder="Email"
              defaultValue={userToEdit?.email || ''}
            />
            <label
              htmlFor={`input-github-${labelId}`}
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            >
              Github
            </label>
            <TextInput
              id={`input-github-${labelId}`}
              name="github"
              placeholder="Github"
              defaultValue={userToEdit?.github || ''}
            />

            <div className="flex items-center justify-between mt-6">
              <div className="min-w-[150px]">
                {result === 'ok' && <Badge color="green">¡Guardado!</Badge>}
                {result === 'ko' && (
                  <Badge color="red">Campos incompletos</Badge>
                )}
              </div>

              <div className="flex gap-x-8">
                <Button
                  variant="light"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500"
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {isEditing ? 'Guardar cambios' : 'Crear usuario'}
                </Button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
