const API_KEY = '6447065d';

export const searchMovies = async ({ search }) => {
  if (search === '') return null;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;

    /* Separar la lógica del contrato de la API y
     formatearlo para que nosotros seamos quienes lo gestionen y la app y los componentes no estén atados a cómo funciona una API. Si el día de mañana se quisiera cambiar la API haciendo esto no habría inconveniente.
    */
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch {
    throw new Error('Error searching movies');
  }
};
