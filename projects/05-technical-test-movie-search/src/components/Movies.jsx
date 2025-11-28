import { useState } from 'react';

const Poster = ({ src, alt }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return error ? (
    <div className="posterError">{alt}</div>
  ) : (
    <img src={src} alt={alt} onError={handleError} />
  );
};

const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li key={movie.id} className="movie">
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <Poster src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
};

const NoMoviesResults = () => {
  return <p>No se encontraron películas para esta búsqueda</p>;
};

const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
};

export default Movies;
