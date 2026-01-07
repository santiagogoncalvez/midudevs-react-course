import {
  configureStore,
  type Middleware,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { toast } from 'sonner';
import usersReducer, {
  rollbackCreatedUser,
  rollbackModifyUser,
  rollbackUser,
  type User,
  type UserId,
  type UserWithId,
} from './users/slice';

const persistanceMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
};

const syncWithDataBaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type } = action as PayloadAction;

    const previousState = store.getState();

    // console.log(store.getState());
    next(action);
    if (type === 'users/addNewUser') {
      // console.log(store.getState());

      const { payload } = action as PayloadAction<User>;
      const nextState = store.getState();
      const createdUser = nextState.users.find(
        (user: UserWithId) =>
          user.name === payload.name &&
          user.email === payload.email &&
          user.github === payload.github,
      );

      fetch('https://jsonplaceholder.typicode.com/users/', {
        method: 'POST',
        body: JSON.stringify({ ...createdUser }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`Usuario ${payload.name} agregado correctamente`);
            return;
          }

          throw new Error(`Error al agregar el usuario ${payload.name}`);
        })
        .catch((err) => {
          toast.error(`Error creando el usuario ${payload.name}`);
          store.dispatch(rollbackCreatedUser(createdUser.id));
          console.log(`Error sync With Data Base: ${err}`);
        });
    }

    if (type === 'users/deleteUserById') {
      // <- Eliminando un usurio
      const { payload } = action as PayloadAction<UserId>;
      const userIdToRemove = payload;
      const userToRemove = previousState.users.find(
        (user: UserWithId) => user.id === userIdToRemove,
      );

      fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            toast.success(
              `Usuario ${userToRemove.name} eliminado correctamente`,
            );
          }
        })
        .catch((err) => {
          toast.error(`Error eliminando el usuario ${userToRemove.name}`);
          if (userToRemove) store.dispatch(rollbackUser(userToRemove));
          console.log(`Error sync With Data Base: ${err}`);
        });
    }

    if (type === 'users/modifyUser') {
      const { payload } = action as PayloadAction<UserWithId>;
      const oldUserId = payload.id;
      const oldUser = previousState.users.find(
        (user: UserWithId) => user.id === oldUserId,
      );

      // se pone 1 como id porque solo acepta un rango de ids específicos, es para fakear la data.
      fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
        method: 'PUT',
        body: JSON.stringify({ ...payload }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`Usuario ${payload.name} modificado correctamente`);
            return;
          }

          throw new Error(`Error al modificar el usuario ${payload.name}`);
        })
        .catch((err) => {
          toast.error(`Error modificando el usuario ${oldUser.name}`);
          if (oldUser) store.dispatch(rollbackModifyUser(oldUser));
          console.log(`Error sync With Data Base: ${err}`);
        });
    }
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (gDM) =>
    gDM().concat(persistanceMiddleware, syncWithDataBaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
