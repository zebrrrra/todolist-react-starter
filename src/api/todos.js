import axios from 'axios';
const baseUrl = 'https://todo-list.alphacamp.io/api';
const axiosInstance = axios.create({ baseURL: baseUrl });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

export const createTodo = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axiosInstance.post(`${baseUrl}/todos`, { title, isDone });
    return res.data;
  } catch (error) {
    console.error('[Create Todos failed]: ', error);
  }
};
export const patchTodo = async (payload) => {
  try {
    const { id, title, isDone } = payload;
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Patch Todos failed]: ', error);
  }
};
export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Todos failed]: ', error);
  }
};
