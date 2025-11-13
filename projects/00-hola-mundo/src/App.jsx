import TwitterFollowCard from './TwitterFollowCard.jsx';

import './App.css';

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true,
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false,
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true,
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false,
  },
];

/* Se pueden pasar como parámetros:
    - Strings
    - Boleanos
    - Números
    - Objetos
    - Funciones
    - Elementos react
*/

function App() {
  // Utilizar como "key" algo que se sepa que es único. Puede ser un id, un nombre de usuario o crearlo con una combinación y lo importante es que sea un identificador único.

  //! Malas prácticas:
  //! - Utilizar la propiedad "index" del array para identificar.
  /*Solo se puede utilizar el "index" (no recomendado) si se tiene claro que ese elemento siempre va a tener el mismo índice y si ningún otro elemento reutiliza ese índice/identificador  */
  //! - Utilizar un "key" con algo aleatorio

  return (
    <section className="App">
      {users.map((user) => {
        const { userName, name, isFollowing } = user;

        return (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        );
      })}
    </section>
  );
}

export default App;
