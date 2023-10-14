import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Single = lazy(() => import('./pages/Single'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'country/:name',
      element: <Single />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;
