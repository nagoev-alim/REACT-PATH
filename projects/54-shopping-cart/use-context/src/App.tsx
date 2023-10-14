import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext.tsx';
import { TYPES } from './utils/constants.ts';
import { FiShoppingCart } from 'react-icons/fi';
import { formatter } from './utils/formatter.ts';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "PhoneShip".
 */
const App = () => {
  const { dispatch, products, totalPrice, totalCount } = useAppContext();

  /**
   * Обработчик уменьшения количества продуктов.
   *
   * @param {Object} payload - Объект с данными продукта.
   */
  function handleDecrease(payload: string) {
    dispatch({ type: TYPES.DECREASE, payload });
  }

  /**
   * Обработчик увеличения количества продуктов.
   *
   * @param {Object} payload - Объект с данными продукта.
   */
  function handleIncrease(payload: string) {
    dispatch({ type: TYPES.INCREASE, payload });
  }

  /**
   * Обработчик удаления продукта из корзины.
   *
   * @param {Object} payload - Объект с данными продукта.
   */
  function handleRemove(payload: string) {
    dispatch({ type: TYPES.REMOVE_PRODUCT, payload });
  }

  /**
   * Обработчик очистки корзины.
   */
  function handleClear() {
    dispatch({ type: TYPES.CLEAR_PRODUCTS });
  }

  return (
    <div className=''>
      <header className='bg-white border-b-2 p-3 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>PhoneShip</h1>
        <div className='flex items-center gap-1.5'>
          <span className='p-2 px-4 font-bold bg-neutral-500 text-white rounded-full'>{totalCount}</span>
          <FiShoppingCart size={30} />
        </div>
      </header>
      <main className='max-w-4xl mx-auto w-full grid'>
        <div className='grid gap-3 my-4 bg-white border-2 p-3 rounded'>
          <h2 className='text-lg font-bold text-center'>Your
            bag {products.length === 0 ? 'is currently empty' : ''}</h2>

          <ul className='grid gap-3'>
            {products.map(({ id, title, price, img, amount }) =>
              <li className='grid gap-2 sm:grid-cols-[350px_200px] sm:items-center sm:justify-between' key={id}>
                <div className='grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center'>
                  <img className='max-w-[200px] mx-auto' src={img} alt={title} />
                  <div className='grid gap-2'>
                    <h3 className='font-bold'>{title}</h3>
                    <p>{formatter.format(price)}</p>
                    <button className='btn' onClick={() => handleRemove(id)}>Remove</button>
                  </div>
                </div>
                <div className='grid gap-2 grid-cols-[1fr_50px_1fr] items-center'>
                  <button className='btn' onClick={() => handleDecrease(id)}>-</button>
                  <span className='font-bold text-center'>{amount}</span>
                  <button className='btn' onClick={() => handleIncrease(id)}>+</button>
                </div>
              </li>,
            )}
          </ul>
          {products.length !== 0 &&
            <div className='grid grid-cols-2 gap-3 pt-4 border-t-2 mt-4'>
              <p className='font-bold'>Total</p>
              <p className='font-bold text-right'>{formatter.format(totalPrice)}</p>
              <button className='btn col-span-2 sm:max-w-max sm:mx-auto' onClick={handleClear}>
                Clear Cart
              </button>
            </div>
          }
        </div>
      </main>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
