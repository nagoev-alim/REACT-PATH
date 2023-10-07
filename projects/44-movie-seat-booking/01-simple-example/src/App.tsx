import { Toaster } from 'react-hot-toast';
import { ChangeEvent, useEffect, useState } from 'react';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Movie Seat Booking".
 */
const App = () => {
  /**
   * Состояние, содержащее список фильмов.
   *
   * @type {Array<{ id: number, name: string }>}
   */
  const [mock] = useState([
    { id: 10, name: 'The Guard' },
    { id: 12, name: 'Harry Potter' },
    { id: 8, name: 'Detachment' },
    { id: 9, name: 'Sing Street' },
  ]);
  /**
   * Состояние, отслеживающее выбранный фильм.
   *
   * @type {number}
   */
  const [selected, setSelected] = useState(localStorage.getItem('movieIndex') || 1);
  /**
   * Состояние, отслеживающее цену билета на выбранный фильм.
   *
   * @type {number}
   */
  const [ticketPrice, setTicketPrice] = useState(mock[selected].id);
  /**
   * Состояние, отслеживающее общую цену выбранных билетов.
   *
   * @type {number}
   */
  const [totalPrice, setTotalPrice] = useState(0);
  /**
   * Состояние, отслеживающее общее количество выбранных билетов.
   *
   * @type {number}
   */
  const [totalPicked, setTotalPicked] = useState(0);
  /**
   * Эффект, выполняющийся при монтировании компонента.
   */
  useEffect(() => {
    handleStorageGetData();
    handleUpdateSelected();
  }, []);

  /**
   * Функция для получения данных из хранилища и обновления выбранных мест.
   */
  function handleStorageGetData(): void {
    const selectedSeats = JSON.parse(localStorage.getItem('seats')!);
    if (selectedSeats !== null && selectedSeats.length > 0) {
      document.querySelectorAll('.row .seat:not(.occupied)').forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) seat.classList.add('selected');
      });
    }
    setTicketPrice(mock[selected].id);
  };

  /**
   * Функция для обновления выбранных мест и их сохранения в хранилище.
   */
  function handleUpdateSelected(): void {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const noteSelectedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
    localStorage.setItem('seats', JSON.stringify([...selectedSeats].map(seat => [...noteSelectedSeats].indexOf(seat))));
    const totalPicked = selectedSeats.length;
    const totalPrice = totalPicked * ticketPrice;
    setTotalPicked(totalPicked);
    setTotalPrice(totalPrice);
  };

  /**
   * Обработчик клика по месту.
   *
   * @param {Object} event - Событие клика.
   */
  function handleSeatClick(event: MouseEvent): void {
    const target = event.target as HTMLDivElement;
    if (!target.classList.contains('occupied')) {
      target.classList.toggle('selected');
      handleUpdateSelected();
    }
  };

  /**
   * Обработчик изменения выбранного фильма.
   *
   * @param {Object} event - Событие изменения значения выбранного фильма.
   */
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const target = event.target as HTMLSelectElement;
    setSelected(Number(target.value));
    setTicketPrice(() => {
      const price = mock[Number(target.value)].id;
      setTotalPrice(price * totalPicked);
      return price;
    });
    localStorage.setItem('movieIndex', target.value);
    handleUpdateSelected();
  };

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Movie Seat Booking</h1>
      <label className='grid gap-1'>
        <span className='font-medium text-sm'>Pick a movie:</span>
        <select className='input' value={selected} onChange={handleChange}>
          {mock.map(({ id, name }, idx) => <option key={idx} value={idx}>{name} (${id})</option>)}
        </select>
      </label>
      <ul className='showcase grid grid-cols-3 place-items-center'>
        {Array.from({ length: 3 }, (_v, i) => i).map((i) =>
          <li className='flex items-center gap-2' key={i}>
            <div className={`seat ${i === 1 ? 'selected' : ''}${i === 2 ? 'occupied' : ''}`}></div>
            <small>
              {i === 0 ? 'N/A' : ''}
              {i === 1 ? 'Selected' : ''}
              {i === 2 ? 'Occupied' : ''}
            </small>
          </li>,
        )}
      </ul>
      <div className='container grid place-items-center gap-3'>
        <div className='screen' />
        {Array.from({ length: 6 }, (_v, i) => i).map(row =>
          <div className='row grid grid-cols-8 gap-3' key={row}>
            {row === 0 && Array.from({ length: 8 }, (_v, i) => i).map((i) => <div key={i} className='seat'
                                                                                  onClick={handleSeatClick} />)}
            {row === 1 && Array.from({ length: 8 }, (_v, i) => i).map((i) => <div key={i}
                                                                                  className={`seat ${i === 3 || i === 4 ? 'occupied' : ''}`}
                                                                                  onClick={handleSeatClick} />)}
            {row === 2 && Array.from({ length: 8 }, (_v, i) => i).map((i) => <div key={i}
                                                                                  className={`seat ${i === 6 || i === 7 ? 'occupied' : ''}`}
                                                                                  onClick={handleSeatClick} />)}
            {row === 3 && Array.from({ length: 8 }, (_v, i) => i).map((i) => <div key={i} className='seat'
                                                                                  onClick={handleSeatClick} />)}
            {row === 4 && Array.from({ length: 8 }, (_v, i) => i).map((i) => <div key={i}
                                                                                  className={`seat ${i === 3 || i === 4 ? 'occupied' : ''}`}
                                                                                  onClick={handleSeatClick} />)}
            {row === 5 && Array.from({ length: 8 }, (_v, i) => i).map((i) => <div key={i}
                                                                                  className={`seat ${i === 4 || i === 5 || i === 6 ? 'occupied' : ''}`}
                                                                                  onClick={handleSeatClick} />)}
          </div>,
        )}
      </div>
      <p className='result text-center'>
        You have selected <span className='font-bold'>{totalPicked}</span> seats for a
        price of $<span className='font-bold'>{totalPrice}</span>
      </p>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
