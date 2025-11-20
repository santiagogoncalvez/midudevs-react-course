import { CAT_ENDPOINT_RANDOM_FACT } from '../constants/urls';

//* Las lógicas que se de negocio u otras lógicas que se extraen no deben tener dependencias de React. Deben ser reutilizables.
export const getFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
    const data = await res.json();
    const { fact } = data;
    return fact;
};