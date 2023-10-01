import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

/**
 * Хук для получения диспетчера Redux-экшенов.
 * @function
 * @returns {AppDispatch} Диспетчер Redux-экшенов.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Хук для выбора и получения состояния из Redux-хранилища.
 * @function
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
