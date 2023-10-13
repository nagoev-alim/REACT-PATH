/**
 * Главный файл приложения, отвечающий за рендеринг корневого компонента в DOM.
 * @module index
 */

import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { AppProvider } from './context/AppContext.tsx';

/**
 * Создает корневой элемент приложения и рендерит в него компонент `App`.
 * @function
 * @param {string} 'root' - Идентификатор корневого элемента, в который будет встроен компонент.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
