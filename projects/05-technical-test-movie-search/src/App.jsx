import Movies from './components/Movies.jsx';
import { useMovies } from './useMovies.js/useMovies.js';
import { useSearch } from './useMovies.js/useSearch.js';
import {  useState } from 'react';
import debounce from 'just-debounce-it';
import './App.css';
import { useMemo } from 'react';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const searchDebounce = useMemo(() => {
    return debounce(
      ({ search }) =>
        getMovies({
          search,
        }),
      300
    );
  }, [getMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    searchDebounce({ search: newSearch });
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={search}
            name="query"
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
            onChange={handleChange}
          />
          <label>
            <input type="checkbox" onChange={handleSort} checked={sort} />
            &nbsp; Ordenar por título &#40;A-Z&#41;
          </label>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: '#DA7CFF' }}>{error}</p>}
      </header>

      <main>
        {loading ? (
          <img src="/loading.gif" alt="Loading..." height="50" width="50" />
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  );
}

export default App;
