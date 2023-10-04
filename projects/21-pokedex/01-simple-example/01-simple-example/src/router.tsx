import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

// 🌴 Lazy Imports
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/DetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// 🌴 App Routes
const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <HomePage />,
    }, {
      path: 'detail/:id',
      element: <AboutPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};

export default AppRoutes;
