/// <reference types="vite/client" />
import axios from 'axios';

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (isLocal ? '/api' : 'https://fundsroom-20u1.onrender.com/api'),
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fundsroom_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('fundsroom_token');
      localStorage.removeItem('fundsroom_user');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  },
);

export default api;
