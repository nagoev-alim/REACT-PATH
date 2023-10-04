import { createContext, FormEvent, useContext, useEffect, useReducer } from 'react';
import { IAppContextProps } from '../types';
import { reducer } from './AppReducer.tsx';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

/**
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);

const transactions = localStorage.getItem('transactions');

const initialState = {
  transactions: transactions ? JSON.parse(transactions) : [],
  balance: 0,
  income: 0,
  expense: 0,
};

/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, для которых предоставляется контекст.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function() {
    dispatch({
      type: 'UPDATE_BALANCE',
      payload: state.transactions,
    });
  }, []);

  /**
   * Обработчик отправки формы.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const text = formData.get('text') as string;
    const amount = formData.get('amount') as string;
    if (text.trim().length === 0 || amount.trim().length === 0) {
      toast.error('Please add a text and amount.');
      return;
    }
    const data = [...state.transactions, { id: uuidv4(), text, amount: Number(amount) }];
    localStorage.setItem('transactions', JSON.stringify(data));
    dispatch({ type: 'UPDATE_BALANCE', payload: data });
    dispatch({ type: 'SET_TRANSACTIONS', payload: data });
    form.reset();
  }

  /**
   * Обработчик удаления записи.
   * @param {string} itemId - Идентификатор удаляемой записи.
   */
  function handleDelete(itemId: string) {
    if (confirm('Do you want to delete the entry?')) {
      dispatch({ type: 'DELETE_ITEM', payload: itemId });
    }
  }

  return (
    <AppContext.Provider value={{ ...state, dispatch, handleSubmit, handleDelete }}>
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
