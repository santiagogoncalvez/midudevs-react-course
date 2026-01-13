import reactLogo from './assets/react.svg';
import { /* useState , use,*/ version } from 'react';
import './App.css';
import { Seo } from './components/Seo';
// import { Form } from './components/Form';
import { preload } from 'react-dom';
import { Logo } from './components/Logo';
// import { UseContextExample } from './clase/UseContextExample';
// import { UserContext } from './context/userCreateContext';
import { Actions } from './clase/Actions';
import { UseOptimisticExample } from './clase/UseOptimisticExample';
// import { UseFetchExample } from './clase/useExample';

function App() {
  // const [show, setShow] = useState(false);
  // const { isLogged } = use(UserContext);

  // Precargar recusos con react
  preload('https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css', {
    as: 'style',
    priority: 'low',
  });
  preload('https://react.dev/images/uwu.png', {
    as: 'image',
    priority: 'low',
  });

  return (
    <>
      {/* Todos los metadatos en react 19 se puede insertar desde lo componentes. No los reemplaza por los que están por defecto en el html, agrega nuevos. */}
      <Seo title="Hola, react 19" description="Información sobre React 19" />
      <link rel="icon" href={reactLogo} />
      <div>
        <Logo />
        <h1 style={{ marginTop: '4px', marginBottom: '4px' }}>Hola react 19</h1>
        <small style={{ color: 'yellow', fontSize: '10px' }}>
          La versión es {version}
        </small>
      </div>
      {/* //* React 19 (metadata): carga de recursos diferida e inserción de elementos metadata */}
      {/* <button onClick={() => setShow(!show)}>Toggle form</button> */}
      {/* {show && <Form />} */}

      {/* //* React 19 (use API): implementación de la 'use' API en componente */}
      {/* {show && <UseFetchExample />} */}

      {/* //* React 19 (use API): implementación de la 'use' API para consumir contextos */}
      {/* <UseContextExample />

      <footer style={{ position: 'fixed', bottom: 0 }} >
        {isLogged ? 'Estas logeado' : 'No estás logeado'}
      </footer> */}

      {/* //* React 19 (useActionState, useFormStatus): uso de los hooks 'useActionState' y 'useFormStatus' orientado a los formularios. */}
      {/* <Actions /> */}

      {/* //* React 19 (useOptimistic): renderizado optimista de la UI */}
      <UseOptimisticExample/>
    </>
  );
}

export default App;
