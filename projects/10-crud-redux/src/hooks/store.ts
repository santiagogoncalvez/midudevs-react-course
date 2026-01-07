// Esto se hace para renombrar y tipar, y en vez de en todos los lugares aclarar los tipos, se especifica una vez y se importa desde ahí.
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
