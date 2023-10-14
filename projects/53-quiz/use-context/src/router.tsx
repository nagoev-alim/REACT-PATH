import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

const Setup = lazy(() => import('./pages/Setup'));
const Questions = lazy(() => import('./pages/Questions'));
const Finish = lazy(() => import('./pages/Finish'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Setup />,
    },
    {
      path: 'questions',
      element: <Questions />,
    },
    {
      path: 'score',
      element: <Finish />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;
