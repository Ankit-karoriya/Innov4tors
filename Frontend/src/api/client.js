import axios from 'axios';

const viteBase = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;
const craBase = typeof process !== 'undefined' && process.env ? process.env.REACT_APP_API_BASE_URL : undefined;

const baseURL = (viteBase || craBase || 'http://localhost:5000/api').replace(/\/$/, '');

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
  }
}

// Initialize from localStorage if present
const saved = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (saved) {
  api.defaults.headers.common.Authorization = `Bearer ${saved}`;
}


