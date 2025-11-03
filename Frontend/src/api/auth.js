import { api, setAuthToken } from './client';

export async function register({ name, email, password, role }) {
  const { data } = await api.post('/auth/register', { name, email, password, role });
  if (data?.data?.token) setAuthToken(data.data.token);
  return data;
}

export async function login({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  if (data?.data?.token) setAuthToken(data.data.token);
  return data;
}

export async function me() {
  const { data } = await api.get('/auth/me');
  return data;
}

export function logout() {
  setAuthToken(null);
}


