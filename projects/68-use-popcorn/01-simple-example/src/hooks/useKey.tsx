import { useEffect } from 'react';


/**
 * Хук для отслеживания нажатия клавиши.
 *
 * @param {string} key - Клавиша для отслеживания.
 * @param {Function} callbackFn - Функция, которая вызывается при нажатии на указанную клавишу.
 */
const useKey = (key: string, callbackFn: () => void) => {
  useEffect(function() {
    function callback({ code }: { code: string }) {
      if (code.toLowerCase() === key.toLowerCase()) callbackFn?.();
    }

    // Добавление слушателя события "keydown" для отслеживания клавиши
    document.addEventListener('keydown', callback);

    return function() {
      // Удаление слушателя события "keydown" при размонтировании компонента
      return document.removeEventListener('keydown', callback);
    };
  }, [key, callbackFn]);
};

export default useKey;
