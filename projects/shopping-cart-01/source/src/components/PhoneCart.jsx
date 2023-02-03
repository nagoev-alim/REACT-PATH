import { useAppHook } from '../context/AppContext.jsx';
import { FiShoppingCart } from 'react-icons/all';
import { formatter } from '../utils/formatter.js';
import { CLEAR_PRODUCTS, DECREASE, INCREASE, REMOVE_PRODUCT } from '../context/constant.js';

const PhoneCart = () => {
  const { dispatch, products, totalPrice, totalCount } = useAppHook();
  const onDecrease = (payload) => dispatch({ type: DECREASE, payload });
  const onIncrease = (payload) => dispatch({ type: INCREASE, payload });
  const onRemove = (payload) => dispatch({ type: REMOVE_PRODUCT, payload });

  return <div className='cart-page'>
    <header className='cart-page__header'>
      <h1 className='cart-page__logo h5'>PhoneShip</h1>
      <div className='cart-page__stats'>
        <span className='cart-page__stats-count'>{totalCount}</span>
        <FiShoppingCart size={30} />
      </div>
    </header>

    <main className='cart-page__main'>
      <div className='container cart-page__container'>
        <h2 className='h4 cart-page__lead'>Your bag {products.length === 0 ? 'is currently empty' : ''}</h2>
        {/* PRODUCTS */}
        <ul className='cart-page__list'>
          {products.map(({ id, title, price, img, amount }) =>
            <li key={id}>
              <div className='cart-page__list-content'>
                <img src={img} alt={title} />
                <div className='cart-page__list-info'>
                  <h3 className='h6'>{title}</h3>
                  <p>{formatter.format(price)}</p>
                  <button className='button button--red' onClick={() => onRemove(id)}>Remove</button>
                </div>
              </div>
              <div className='cart-page__list-buttons'>
                <button className='button cart-page__list-button' onClick={() => onDecrease(id)}>-</button>
                <span className='h5'>{amount}</span>
                <button className='button cart-page__list-button' onClick={() => onIncrease(id)}>+</button>
              </div>
            </li>,
          )}
        </ul>
        {/* TOTAL */}
        {products.length !== 0 &&
          <div className='total'>
            <p className='total__title h5'>Total</p>
            <p className='h5 total__value'>{formatter.format(totalPrice)}</p>
            <button className='button button--red' onClick={() => {
              dispatch({ type: CLEAR_PRODUCTS });
            }}>Clear Cart
            </button>
          </div>
        }
      </div>
    </main>
  </div>;
};

export default PhoneCart;
