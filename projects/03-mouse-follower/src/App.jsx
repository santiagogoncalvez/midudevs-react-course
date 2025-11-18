import { useState, useEffect } from 'react';

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Efecto', { enabled });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log('handleMove', { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      console.log('cleanup');
      window.addEventListener('pointermove', handleMove);
    }

    // Cleanup
    // -> Se ejecuta cuando el componente se desmonta
    // -> Se ejecuta cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return () => { // cleanup method
      console.log('cleanup');
      window.removeEventListener('pointermove', handleMove);
    };
  }, [enabled]);

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => document.body.classList.remove('no-cursor', enabled);
  }, [enabled]);

  // Ejecuciones de los useEffect():
  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente


  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  );
};

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  );
}

export default App;
