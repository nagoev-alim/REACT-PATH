import { BASE_URL } from './constant.js';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

export const actions = {
  fetch: async () => {
    const { data } = await axios.get();
    return data;
  },
  add: async (payload) => {
    const { data } = await axios.post(BASE_URL, payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await axios.put(`${id}`, payload);
    return data;
  },
  delete: async (id) => {
    await axios.delete(`${id}`);
    return id
  },
};
