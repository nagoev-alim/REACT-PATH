import { createContext, useContext, useEffect, useState } from 'react';
import { IAppContextProps, Product } from '../types';
import axios from 'axios';

/**
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);


/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, для которых предоставляется контекст.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[] | []>(() => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  });
  const [cartProducts, setCartProducts] = useState<Product[] | []>(() => {
    const cartProducts = localStorage.getItem('cartProducts');
    return cartProducts ? JSON.parse(cartProducts) : [];
  });
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        if (products.length !== 0) return;
        setIsLoading(true);
        const { data } = await axios.get('https://fakestoreapi.com/products');
        const formatted = data.map(p => ({ ...p, quantity: 0 }));
        console.log(formatted);
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

  /**
   * Функция для сохранения данных в localStorage.
   *
   * @param {Product[]} data - Данные для сохранения.
   * @param {string} name - Название ключа localStorage.
   */
  function storageSet(data: Product[], name: string): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  /**
   * Функция для открытия/закрытия корзины.
   */
  function toggleCartOpen(): void {
    setToggleCart(prev => !prev);
  }

  /**
   * Функция для увеличения количества продукта в корзине.
   *
   * @param {number} id - Идентификатор продукта.
   */
  function increaseQuantity(id: number): void {
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
  }

  /**
   * Функция для уменьшения количества продукта в корзине.
   *
   * @param {number} id - Идентификатор продукта.
   */
  function decreaseQuantity(id: number): void {
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
  }

  /**
   * Функция для удаления продукта из корзины.
   *
   * @param {number} id - Идентификатор продукта.
   */
  function removeFromCart(id: number): void {
    let copy = products;
    copy = copy.map(p => p.id === id ? { ...p, quantity: 0 } : p);
    setProducts(copy);
    storageSet(copy, 'products');
    setCartProducts(prev => {
      const cartCopy = prev.filter(p => p.id !== id);
      storageSet(cartCopy, 'cartProducts');
      return cartCopy;
    });
  }

  /**
   * Вычисляет общую сумму и количество товаров в корзине.
   *
   * @type {Object}
   * @property {number} price - Общая стоимость товаров в корзине.
   * @property {number} amount - Общее количество товаров в корзине.
   */
  const cartProductDetail = cartProducts.reduce((a, c) => {
    const amount = a.amount + c.quantity;
    const price = a.price + c.quantity * c.price;
    return { price, amount };
  }, { price: 0, amount: 0 });

  return (
    <AppContext.Provider value={{
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
    </AppContext.Provider>
  );
};

/**
 * Хук для использования контекста приложения.
 * @returns {IAppContextProps} Значение контекста приложения.
 * @throws {Error} Если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): IAppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
