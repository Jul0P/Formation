import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router';
import { router } from './router';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cinefrei-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
