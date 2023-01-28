import { useEffect, useState } from 'react';

const MovieSeatBooking = () => {
  const [mock] = useState([
    { id: 10, name: 'The Guard' },
    { id: 12, name: 'Harry Potter' },
    { id: 8, name: 'Detachment' },
    { id: 9, name: 'Sing Street' },
  ]);
  const [selected, setSelected] = useState(localStorage.getItem('movieIndex') || 1);
  const [ticketPrice, setTicketPrice] = useState(mock[1].id);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPicked, setTotalPicked] = useState(0);

  useEffect(() => {
    storageGetData();
    updateSelected();
  }, []);

  // 🚀 METHODS: ================================
  /**
   * @function storageGetData - Get and display data from localstorage
   */
  const storageGetData = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('seats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      document.querySelectorAll('.row .seat:not(.occupied)').forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) seat.classList.add('selected');
      });
    }
  };

  /**
   * @function updateSelected - Update selected seats
   */
  const updateSelected = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const noteSelectedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
    localStorage.setItem('seats', JSON.stringify([...selectedSeats].map(seat => [...noteSelectedSeats].indexOf(seat))));

    const totalPicked = selectedSeats.length;
    const totalPrice = totalPicked * ticketPrice;

    setTotalPicked(totalPicked);
    setTotalPrice(totalPrice);
  };

  /**
   * @function onSeatClick - Seat click handler
   * @param target
   */
  const onSeatClick = ({ target }) => {
    if (!target.classList.contains('occupied')) {
      target.classList.toggle('selected');
      updateSelected();
    }
  };

  /**
   * @function onChange - Select change handler
   * @param target
   */
  const onChange = ({ target }) => {
    setSelected(Number(target.value));
    setTicketPrice(() => {
      const price = mock[Number(target.value)].id;
      setTotalPrice(price * totalPicked);
      return price;
    });
    localStorage.setItem('movieIndex', target.value);
    updateSelected();
  };

  // 🚀 RENDER: ================================
  return <div className='booking'>
    <h1 className='title'>Movie Seat Booking</h1>
    <label>
      <span>Pick a movie:</span>
      <select value={selected} onChange={onChange}>
        {mock.map(({ id, name }, idx) => <option key={idx} value={idx}>{name} (${id})</option>)}
      </select>
    </label>
    <ul className='showcase'>
      {Array.from({ length: 3 }, (v, i) => i).map((i) =>
        <li key={i}>
          <div className={`seat ${i === 1 ? 'selected' : ''}${i === 2 ? 'occupied' : ''}`}></div>
          <small>
            {i === 0 ? 'N/A' : ''}
            {i === 1 ? 'Selected' : ''}
            {i === 2 ? 'Occupied' : ''}
          </small>
        </li>,
      )}
    </ul>
    <div className='container'>
      <div className='screen' />
      {Array.from({ length: 6 }, (v, i) => i).map(row =>
        <div className='row' key={row}>
          {row === 0 && Array.from({ length: 8 }, (v, i) => i)
            .map((i) => <div key={i} className='seat' onClick={onSeatClick}></div>)}
          {row === 1 && Array.from({ length: 8 }, (v, i) => i)
            .map((i) => <div key={i} className={`seat ${i === 3 || i === 4 ? 'occupied' : ''}`}
                             onClick={onSeatClick}></div>)}
          {row === 2 && Array.from({ length: 8 }, (v, i) => i)
            .map((i) => <div key={i} className={`seat ${i === 6 || i === 7 ? 'occupied' : ''}`}
                             onClick={onSeatClick}></div>)}
          {row === 3 && Array.from({ length: 8 }, (v, i) => i)
            .map((i) => <div key={i} className='seat' onClick={onSeatClick}></div>)}
          {row === 4 && Array.from({ length: 8 }, (v, i) => i)
            .map((i) => <div key={i} className={`seat ${i === 3 || i === 4 ? 'occupied' : ''}`}
                             onClick={onSeatClick}></div>)}
          {row === 5 && Array.from({ length: 8 }, (v, i) => i)
            .map((i) => <div key={i} className={`seat ${i === 4 || i === 5 || i === 6 ? 'occupied' : ''}`}
                             onClick={onSeatClick}></div>)}
        </div>,
      )}
    </div>
    <p className='result'>You have selected <span>{totalPicked}</span> seats for a price of $<span>{totalPrice}</span></p>
  </div>;
};

export default MovieSeatBooking;
