import { createBrowserRouter } from 'react-router';

import RootLayout from '@/layouts/RootLayout';

import ErrorPage from '@/routes/error';
import HomePage from '@/routes/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
