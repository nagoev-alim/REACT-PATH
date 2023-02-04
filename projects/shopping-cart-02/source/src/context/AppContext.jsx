import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://fakestoreapi.com/products';

const AppContext = createContext(null);

const useAppHook = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []);
  const [cartProducts, setCartProducts] = useState(localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts')) : []);
  const [toggleCart, setToggleCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch products
  useEffect(() => {
    (async () => {
      try {
        if (products.length !== 0) return;
        setIsLoading(true);
        const { data } = await axios.get();
        const formatted = data.map(p => ({ ...p, quantity: 0 }));
        setProducts(formatted);
        storageSet(formatted, 'products');
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsError(true);
        setProducts([]);
        setCartProducts([]);
        setIsLoading(false);
      }
    })();
  }, []);

  const storageSet = (data, name) => localStorage.setItem(name, JSON.stringify(data));

  // Toggle Cart
  const toggleCartOpen = () => setToggleCart(prev => !prev);

  // Increase Quantity
  const increaseQuantity = (id) => {
    let copy = products;
    copy = copy.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p);
    const find = copy.find(p => p.id === id);

    setProducts(copy);
    storageSet(copy, 'products');
    setCartProducts(prev => {
      const cartCopy = prev.length !== 0 && prev.find(p => p.id === id)
        ? prev.map(p => p.id === id ? { ...p, quantity: find.quantity } : p)
        : [...prev, find];
      storageSet(cartCopy, 'cartProducts');
      return cartCopy;
    });
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    let copy = products;
    copy = copy.map(p => p.id === id ? {
      ...p,
      quantity: copy.find(p => p.id === id).quantity === 1 ? 0 : p.quantity - 1,
    } : p);
    const find = copy.find(p => p.id === id);

    setProducts(copy);
    storageSet(copy, 'products');
    setCartProducts(prev => {
      const cartCopy = prev.find(p => p.id === id) && find.quantity === 0
        ? prev.filter(p => p.id !== id)
        : prev.map(p => p.id === id ? { ...p, quantity: find.quantity } : p);
      storageSet(cartCopy, 'cartProducts');
      return cartCopy;
    });
  };

  // Remove Product From Cart
  const removeFromCart = (id) => {
    let copy = products;
    copy = copy.map(p => p.id === id ? { ...p, quantity: 0 } : p);
    setProducts(copy);
    storageSet(copy, 'products');
    setCartProducts(prev => {
      const cartCopy = prev.filter(p => p.id !== id);
      storageSet(cartCopy, 'cartProducts');
      return cartCopy;
    });
  };

  // Get total amount and price
  const cartProductDetail = cartProducts.reduce((a, c) => {
    const amount = a.amount + c.quantity;
    const price = a.price + c.quantity * c.price;
    return { price, amount };
  }, { price: 0, amount: 0 });

  return <AppContext.Provider value={{
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    toggleCartOpen,
    cartProductDetail,
    products,
    cartProducts,
    toggleCart,
    isLoading,
    isError,
  }}>
    {children}
  </AppContext.Provider>;
};

export { AppContext, AppProvider, useAppHook };
