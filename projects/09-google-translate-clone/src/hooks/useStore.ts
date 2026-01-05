import { AUTO_LANGUAGE } from '../constants';
import type { Action, FromLanguage, Language, State } from '../types';
import { useReducer } from 'react';

// 1. Create a initialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
  detectedLanguage: null,
};

// 2. Create a reducer
function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGE') {
    // Lógica del estado dentro del reducer porque lo evitamos en los componentes
    if (state.fromLanguage === AUTO_LANGUAGE) return state;

    // const loading = state.fromText !== '';

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result,
      result: state.fromText,
      loading: false,
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state;

    const loading = state.fromText !== '';

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading,
      detectedLanguage: null,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== '';

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading,
    };
  }
  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== '';

    return {
      ...state,
      fromText: action.payload,
      loading,
      result: '',
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      result: action.payload.result,
      detectedLanguage: action.payload.detectedLanguage,
      loading: false,
    };
  }

  return state;
}

export function useStore() {
  const [
    { fromLanguage, toLanguage, fromText, result, loading, detectedLanguage },
    dispatch,
  ] = useReducer(reducer, initialState);
  // console.log(fromLanguage);

  //Crear un contrato y que se pueda utilizar en cualquier sitio y exportarlo.
  // No devolver el dispatch.
  // Mantener la lógica de negocio y actualización del estado en un solo lugar.
  const interchangeLanguage = () => dispatch({ type: 'INTERCHANGE_LANGUAGE' });

  const setFromLanguage = (payload: FromLanguage) =>
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });

  const setToLanguage = (payload: Language) =>
    dispatch({ type: 'SET_TO_LANGUAGE', payload });

  const setFromText = (payload: string) =>
    dispatch({ type: 'SET_FROM_TEXT', payload });

  const setResult = (payload: { result: string; detectedLanguage: string | null }) =>
    dispatch({ type: 'SET_RESULT', payload });

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    detectedLanguage,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
