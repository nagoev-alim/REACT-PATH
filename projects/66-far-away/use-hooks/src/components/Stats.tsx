/**
 * Пропсы для компонента Stats.
 * @interface {Object} IStatsProps
 * @property {Array} items - Список элементов, которые необходимо упаковать.
 * @property {string} items[].description - Описание элемента.
 * @property {number} items[].quantity - Количество элементов.
 * @property {boolean} items[].packed - Флаг состояния элемента (упакован/не упакован).
 * @property {number} items[].id - Идентификатор элемента.
 */
interface IStatsProps {
  items: {
    description: string;
    quantity: number;
    packed: boolean;
    id: number;
  }[];
}

/**
 * React-компонент для отображения статистики упаковки элементов.
 * @param {IStatsProps} props - Пропсы компонента.
 */
const Stats = ({ items }: IStatsProps) => {
  if (!items.length) {
    return (
      <p className='stats'>
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go ✈️'
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
};

export default Stats;
