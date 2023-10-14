interface Props {
  num: number;
  activeTab: number;
  onClick: (num: number) => void;
}

/**
 * Создает компонент вкладки.
 *
 * @param {object} props - Свойства компонента.
 * @param {number} props.num - Номер вкладки.
 * @param {number} props.activeTab - Номер активной вкладки.
 * @param {function} props.onClick - Функция, вызываемая при щелчке на вкладке.
 * @returns {JSX.Element} Возвращает JSX-элемент кнопки вкладки.
 */
const Tab = ({ num, activeTab, onClick }: Props) => {
  return (
    <button
      className={activeTab === num ? 'tab active' : 'tab'}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
};

export default Tab;