import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserId = string;
export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const DEFAULT_STATE = [
  {
    id: '0',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    github: 'arivera-dev',
  },
  {
    id: '1',
    name: 'Beatriz Soto',
    email: 'b.soto@techmail.org',
    github: 'beasoto-code',
  },
  {
    id: '2',
    name: 'Carlos Méndez',
    email: 'cmendez.fullstack@provider.net',
    github: 'carlosm-dev',
  },
];

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__');
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      state.push({ id, ...action.payload });
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const id = action.payload.id;
      const isUserAlreadyDefined = state.find((user) => user.id === id);
      if (!isUserAlreadyDefined) {
        state.push(action.payload);
      }
    },

    rollbackModifyUser: (state, action: PayloadAction<UserWithId>) => {
      const oldUser = action.payload;

      return state.map((user) => {
        if (user.id === oldUser.id) {
          return oldUser;
        }
        return user;
      });
    },
    rollbackCreatedUser: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    modifyUser: (state, action: PayloadAction<UserWithId>) => {
      const modifyUser = action.payload;

      return state.map((user) => {
        if (user.id === modifyUser.id) {
          return modifyUser;
        }
        return user;
      });
    },
  },
});

export default usersSlice.reducer;
// Exportar acciones
export const {
  addNewUser,
  deleteUserById,
  rollbackUser,
  rollbackModifyUser,
  rollbackCreatedUser,
  modifyUser,
} = usersSlice.actions;
