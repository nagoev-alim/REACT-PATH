import axios from 'axios';

// https://api.rawg.io/docs
/**
 * Создает и экспортирует экземпляр Axios для взаимодействия с API "Rawg".
 * @type {AxiosInstance}
 */
export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '08bb44b9a0a04d7686d19df766158006',
  },
});

