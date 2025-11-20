export const getWords = (string, numberWords = 1) => {
  // Sacarle las comas a los elementos seleccionados. Utilizar el método string para reemplazar un caracter por otro.
  return string
    .split(' ')
    .slice(0, numberWords)
    .map((word) => word.replace(',', ''))
    .join(' ');
};