import { useState } from 'react';

interface Props {
  item: {
    summary: string;
    details: string;
  };
}

/**
 * Компонент для отображения содержимого вкладки.
 *
 * @param {Props} props - Объект, содержащий свойства компонента TabContent.
 * @returns {JSX.Element} Возвращает JSX-элемент содержимого вкладки.
 */
const TabContent = ({ item }: Props) => {
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);

  /**
   * Увеличивает счетчик лайков на 1.
   */
  function handleInc() {
    setLikes(likes => likes + 1);
  }

  /**
   * Увеличивает счетчик лайков на 3.
   */
  function handleTripleInc() {
    setLikes(likes => likes + 1);
    setLikes(likes => likes + 1);
    setLikes(likes => likes + 1);
  }

  /**
   * Переключает видимость дополнительных деталей.
   */
  function handleDetails() {
    setShowDetails((h) => !h);
  }

  /**
   * Сбрасывает состояние: отображает детали и сбрасывает счетчик лайков.
   */
  function handelUndo() {
    setShowDetails(true);
    setLikes(0);
  }

  /**
   * Запускает функцию handleUndo через 2 секунды.
   */
  function handleUndoLater() {
    setTimeout(handelUndo, 2000);
  }

  return (
    <div className='tab-content'>
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className='tab-actions'>
        <button onClick={handleDetails}>{showDetails ? 'Hide' : 'Show'} details</button>

        <div className='hearts-counter'>
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className='tab-undo'>
        <button onClick={handelUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
};

export default TabContent;