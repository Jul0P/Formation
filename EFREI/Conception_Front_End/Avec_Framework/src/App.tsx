import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { router } from './router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Fournit le contexte React Query à l'application */}
      <ThemeProvider defaultTheme="dark" storageKey="cinefrei-theme">
        {/* Fournit le contexte de thème à l'application avec le thème par défaut "dark" */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
