import RootLayout from '@/layouts/RootLayout';
import { UserDetail } from '@/routes/details';
import ErrorPage from '@/routes/error';
import { Home } from '@/routes/index';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user/:userId',
        element: <UserDetail />,
      },
    ],
  },
]);
