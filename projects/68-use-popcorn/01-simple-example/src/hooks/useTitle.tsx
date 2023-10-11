import { useEffect } from 'react';

/**
 * Хук для установки заголовка документа.
 *
 * @param {string} title - Новый заголовок документа.
 */
const useTitle = (title) => {
  useEffect(function() {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return function() {
      return document.title = 'usePopcorn';
    };
  }, [title]);
};

export default useTitle;
