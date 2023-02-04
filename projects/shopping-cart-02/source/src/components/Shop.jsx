import { FiShoppingCart, FiX } from 'react-icons/fi';
import { useAppHook } from '../context/AppContext.jsx';
import { formatter } from '../utils/formatter.js';
import { Error, Loading } from './index.js';

const Shop = () => {
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
  } = useAppHook();

  return <div className='cart-page'>
    {/* Header */}
    <header className='cart-page__header'>
      <h1 className='cart-page__logo h5'>Shop</h1>
      {cartProductDetail.amount > 0 && <div className='cart-page__stats' onClick={toggleCartOpen}>
        <span className='cart-page__stats-count'>{cartProductDetail.amount}</span>
        <FiShoppingCart size={30} />
      </div>}
    </header>
    {isError && <Error/>}
    {isLoading && <Loading/>}
    {/* Main */}
    <main className='cart-page__main'>
      <div className='container cart-page__container'>
        {/* PRODUCTS */}
        <ul className='cart-page__list'>
          {products.map(product =>
            <li key={product.id}>
              <div className='cart-page__list-content'>
                <img src={product.image} alt={product.title} />
                <div className='cart-page__list-info'>
                  <h3 className='h6'>{product.title}</h3>
                  <p>{formatter.format(product.price)}</p>
                </div>
              </div>
              {product.quantity === 0
                ? (
                  <button className='button button--primary' onClick={() => increaseQuantity(product.id)}>
                    Add to cart
                  </button>
                )
                : (
                  <>
                    <button className='button button--red' onClick={() => removeFromCart(product.id)}>Remove</button>
                    <div className='cart-page__list-buttons'>
                      <button className='button cart-page__list-button' onClick={() => decreaseQuantity(product.id)}>-
                      </button>
                      <span className='h5'>{product.quantity}</span>
                      <button className='button cart-page__list-button' onClick={() => increaseQuantity(product.id)}>+
                      </button>
                    </div>
                  </>
                )
              }
            </li>,
          )}
        </ul>
      </div>
    </main>

    {/* Cart */}
    <div className={`overlay ${toggleCart ? 'is-show' : ''} `} onClick={toggleCartOpen}>
      <div className='cart' onClick={(e) => e.stopPropagation()}>
        <div className='cart__header'>
          <h2 className='h4'>Cart</h2>
          <button className='button button--primary' onClick={toggleCartOpen}><FiX size={20} /></button>
        </div>
        <div className='cart__container'>
          {cartProducts.length !== 0 ? <>
              <ul className='cart__list'>
                {cartProducts.map((product) =>
                  <li className='cart__list-item' key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <h3 className='h6'>{product.title}</h3>
                    <h3 className='h6'>Quantity: {product.quantity}</h3>
                    <p>{formatter.format(product.price)}</p>
                    <button className='button button--red' onClick={() => removeFromCart(product.id)}>Remove From Cart
                    </button>
                  </li>,
                )}
              </ul>
              <p className='cart__total h5'>Total: {formatter.format(cartProductDetail.price)}</p>
            </>
            : <p className='cart__total h5'>Cart is empty</p>
          }
        </div>
      </div>
    </div>
  </div>;
};

export default Shop;
