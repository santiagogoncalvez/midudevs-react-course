import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const theme = createTheme({
  fontFamily: 'Inter Variable, sans-serif',

  // Esto asegura que los títulos también la usen
  headings: {
    fontFamily: 'Inter Variable, sans-serif',
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </MantineProvider>
);
