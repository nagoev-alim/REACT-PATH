import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext.tsx';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import { formatter } from './utils/formatter.ts';
import { Loading, Error } from './components';


/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Shopping Cart".
 */
const App = () => {
  const {
    products,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    toggleCartOpen,
    cartProducts,
    toggleCart,
    cartProductDetail,
    isLoading,
    isError
  } = useAppContext();

  return (
    <div className=''>
      <header className='bg-white border-b-2 p-3 flex justify-between items-center gap-3'>
        <h1 className='font-bold'>Shop</h1>
        {cartProductDetail.amount > 0 && (
          <div className='flex items-center gap-1.5' onClick={toggleCartOpen}>
            <span className='font-bold bg-neutral-500 text-white py-2 px-4 rounded-full'>{cartProductDetail.amount}</span>
            <FiShoppingCart size={30} />
          </div>
        )}
      </header>

      {isError && <Error />}

      {isLoading && <Loading />}

      <main className='my-4 max-w-7xl w-full mx-auto'>
        <ul className='grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
          {products.map(product =>
            <li className='bg-white p-4 border-2 rounded flex flex-col items-center gap-2' key={product.id}>
              <div className='mb-auto grid gap-1.5 place-items-center text-center'>
                <img className='max-w-[150px] max-h-[150px] object-contain w-full mx-auto' src={product.image} alt={product.title} />
                <div className='cart-page__list-info'>
                  <h3 className='font-bold text-sm'>{product.title}</h3>
                  <p>{formatter.format(product.price)}</p>
                </div>
              </div>
              <div className='grid gap-2'>
                {product.quantity === 0
                  ? (
                    <button className='btn bg-neutral-500 text-white hover:bg-neutral-500' onClick={() => increaseQuantity(product.id)}>
                      Add to cart
                    </button>
                  )
                  : (
                    <div className='grid gap-2'>
                      <button className='btn bg-red-200 hover:bg-red-300 border-2 border-red-400' onClick={() => removeFromCart(product.id)}>Remove</button>
                      <div className='grid grid-cols-[1fr_50px_1fr] items-center'>
                        <button className='btn' onClick={() => decreaseQuantity(product.id)}>-</button>
                        <span className='font-bold text-center'>{product.quantity}</span>
                        <button className='btn' onClick={() => increaseQuantity(product.id)}>+</button>
                      </div>
                    </div>
                  )
                }
              </div>
            </li>,
          )}
        </ul>
      </main>

      <div className={`fixed bg-neutral-900/50 z-40 w-full h-full top-0 left-0 ${toggleCart ? '' : 'hidden'} `} onClick={toggleCartOpen}>
        <div className='bg-white max-w-[300px] absolute right-0 top-0 h-full overflow-auto' onClick={(e) => e.stopPropagation()}>
          <div className='flex items-center justify-between p-3'>
            <h2 className='font-bold'>Cart</h2>
            <button className='btn' onClick={toggleCartOpen}><FiX size={20} /></button>
          </div>
          <div className='p-3'>
            {cartProducts.length !== 0 ? (
              <div className='grid gap-4'>
                <ul className='grid gap-3'>
                  {cartProducts.map((product) =>
                    <li className='grid gap-2 place-items-center text-center' key={product.id}>
                      <img className='max-w-[100px] mx-auto' src={product.image} alt={product.title} />
                      <h3 className='font-bold text-sm'>{product.title}</h3>
                      <h3 className='font-bold'>Quantity: {product.quantity}</h3>
                      <p>{formatter.format(product.price)}</p>
                      <button className='btn' onClick={() => removeFromCart(product.id)}>
                        Remove From Cart
                      </button>
                    </li>,
                  )}
                </ul>
                <p className='text-center'><span className='font-bold'>Total:</span> {formatter.format(cartProductDetail.price)}</p>
              </div>
            )
              : <p className='font-bold text-center'>Cart is empty</p>
            }
          </div>
        </div>
      </div>

      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;
