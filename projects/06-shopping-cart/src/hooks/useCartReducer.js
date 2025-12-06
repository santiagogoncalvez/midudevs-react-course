import { useReducer } from 'react';
import { initialState, reducer } from '../reducers/cart';
import { CART_ACTION_TYPES } from '../constants/cartActionTypes';

export const useCartReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product });
  };
  const clearCart = () => {
    dispatch({ type: CART_ACTION_TYPES.CLEAR_CART });
  };

  return { state, addToCart, removeFromCart, clearCart };
};
