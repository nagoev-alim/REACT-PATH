import axios from 'axios';

axios.defaults.baseURL = 'https://63d58a4d94e769375ba4cc65.mockapi.io/';

export const actionHandlers = {
  fetchPosts: async () => {
    const { data } = await axios.get('twits');
    return data;
  },
  addPost: async (post) => {
    const { data } = await axios.post('twits', post);
    return data;
  },
  updatePost: async (id, post) => {
    const { data } = await axios.put(`twits/${id}`, post);
    return data;
  },
  deletePost: async (id) => {
    const { data } = await axios.delete(`twits/${id}`);
    return data;
  },
};
