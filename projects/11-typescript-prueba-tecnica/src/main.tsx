import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Inter Variable, sans-serif',

  // Esto asegura que los títulos también la usen
  headings: {
    fontFamily: 'Inter Variable, sans-serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
