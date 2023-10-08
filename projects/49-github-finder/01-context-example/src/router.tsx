import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/Home'));
const Single = lazy(() => import('./pages/Single'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'single/:login',
      element: <Single />,
    },
    {
      path: 'about',
      element: <About />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;
