import { CART_ACTION_TYPES } from '../constants/cartActionTypes';

export const initialState =
  JSON.parse(window.localStorage.getItem('cart')) || [];

export const updateLocalStorge = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state));
};

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (productInCartIndex >= 0) {
      //* Una forma es usando structClone
      // const newState = structuredClone(state);
      // newState[productInCartIndex].quantity++;
      // updateLocalStorge(newState);

      //* usando el map
      // const newState = state.map((item) => {
      //   if (item.id === id) {
      //     return {
      //       ...item,
      //       quantity: item.quantity + 1,
      //     };
      //   }

      //   return item;
      // });
      // updateLocalStorge(newState);

      // Usando slice y el spread operator
      const newState = [
        ...state.slice(0, productInCartIndex),
        {
          ...state[productInCartIndex],
          quantity: state[productInCartIndex].quantity + 1,
        },
        ...state.slice(productInCartIndex + 1),
      ];
      updateLocalStorge(newState);

      return newState;
    }

    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      },
    ];

    updateLocalStorge(newState);
    return newState;
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload;
    const newState = state.filter((item) => item.id !== id);
    updateLocalStorge(newState);
    return newState;
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorge([]);
    return [];
  },
};

export const reducer = (state, action) => {
  const { type: actionType } = action;

  const updateState = UPDATE_STATE_BY_ACTION[actionType];

  return updateState ? updateState(state, action) : state;
};
