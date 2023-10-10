import { createContext, useContext, useEffect, useReducer } from 'react';
import { Country, IAppContextProps, IAppState } from '../types';
import { reducer } from './AppReducer.tsx';
import axios from 'axios';
import { ALL_COUNTRIES_URL, filterByCode, searchByCountry, TYPES } from '../utils/constants.ts';
import toast from 'react-hot-toast';

const theme = localStorage.getItem('theme');
const countriesStorage = localStorage.getItem('countriesStorage');

const initialState: IAppState = {
  countries: countriesStorage ? JSON.parse(countriesStorage) : [],
  filtered: [],
  country: null,
  isLoading: false,
  isError: false,
  theme: theme ?? 'light',
  countryBorders: [],
};

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
  /**
   * Хук для управления состоянием приложения и выполнения запросов к серверу.
   *
   * @function
   * @name useCountryApp
   * @returns {[State, Dispatch]} - Массив, содержащий состояние приложения и функцию для его обновления.
   */
  const [state, dispatch] = useReducer(reducer, initialState);
  /**
   * Загружает информацию о странах при монтировании компонента.
   *
   * @function
   * @name fetchCountries
   * @async
   * @returns {Promise<void>}
   */
  useEffect(function() {
    if (state.countries.length === 0) fetchCountries();
  }, []);

  /**
   * Получает данные о странах с сервера и обновляет состояние приложения.
   *
   * @function
   * @name fetchCountries
   * @async
   * @returns {Promise<void>}
   */
  async function fetchCountries(): Promise<void> {
    try {
      dispatch({ type: TYPES.SET_LOADING, payload: true });
      const { data } = await axios.get<Country[]>(ALL_COUNTRIES_URL);
      dispatch({ type: TYPES.SET_COUNTRIES, payload: data });
      localStorage.setItem('countriesStorage', JSON.stringify(data));
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        toast.error('Something wrong, open dev console.');
        dispatch({ type: TYPES.SET_ERROR, payload: true });
      }
    } finally {
      dispatch({ type: TYPES.SET_LOADING, payload: false });
    }
  }

  /**
   * Фильтрует список стран по строке запроса и региону, обновляя состояние приложения.
   *
   * @function
   * @name handleFilter
   * @param {string} query - Строка запроса для поиска стран.
   * @param {string} region - Регион для фильтрации стран.
   * @returns {void}
   */
  function handleFilter(query: string, region: string): void {
    let copy = [...state.countries];
    copy = region ? copy.filter(item => item.region.includes(region)) : copy;
    copy = query ? copy.filter(item => item.name.toLowerCase().includes(query.toLowerCase())) : copy;
    dispatch({ type: TYPES.SET_FILTERED, payload: copy });
  }

  /**
   * Получает информацию о выбранной стране с сервера и обновляет состояние приложения.
   *
   * @function
   * @name fetchCountry
   * @async
   * @param {string} name - Название выбранной страны.
   * @returns {void}
   */
  async function fetchCountry(name: string): Promise<void> {
    try {
      dispatch({ type: TYPES.SET_LOADING, payload: true });
      const { data } = await axios.get(searchByCountry(name));
      dispatch({
        type: TYPES.SET_COUNTRY, payload: {
          name: data[0].name,
          nativeName: data[0].nativeName,
          flag: data[0].flag,
          capital: data[0].capital,
          population: data[0].population,
          region: data[0].region,
          subregion: data[0].subregion,
          topLevelDomain: data[0].topLevelDomain,
          currencies: data[0].currencies,
          languages: data[0].languages,
          borders: data[0].borders,
        },
      });
      if (data[0].borders && data[0].borders.length !== 0) {
        const { data: dataBorder } = await axios.get(filterByCode(data[0].borders));
        dispatch({ type: TYPES.SET_BORDERS, payload: dataBorder.map(b => b.name) });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        toast.error('Something wrong, open dev console.');
        dispatch({ type: TYPES.SET_ERROR, payload: true });
      }
    } finally {
      dispatch({ type: TYPES.SET_LOADING, payload: false });
    }
  }

  /**
   * Обрабатывает переключение темы интерфейса.
   *
   * @function
   * @name handleThemeToggle
   * @returns {void}
   */
  function handleThemeToggle(): void {
    dispatch({ type: TYPES.SET_THEME });
  }

  return (
    <AppContext.Provider value={{ ...state, dispatch, handleFilter, fetchCountry, handleThemeToggle }}>
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
