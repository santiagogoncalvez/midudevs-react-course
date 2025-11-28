import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';
import './App.css';

const App = () => {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  // Evitar pasar las funciones de actualización de estado a otros lugares (hacia afuera), se deben quedar en el componente ya que es una cosa interna del este. Ya que se si se pasa la función de actualización de estado específica deja de ser reutilizable.
  const handleClick = () => refreshFact();

  return (
    //   Siempre ser semántico, y más en una prueba técnica
    <main>
      <h1>Hello React</h1>
      <button onClick={handleClick}>Get new Fact</button>
      {fact && <p>{fact}</p>}
      {/* SIEMPRE poner un alt a las imágenes aunque sea una descripción general pero que sea una buena descripción, no un simple 'img' o 'cats' */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image extracted using the three word for ${fact}`}
        />
      )}
    </main>
  );
};

export default App;
