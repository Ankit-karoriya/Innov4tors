import { api } from './client';

export async function listCredits() {
  const { data } = await api.get('/credits');
  return data;
}

export async function createCredit({ title, price, quantity }) {
  const { data } = await api.post('/credits', { title, price, quantity });
  return data;
}

export async function buyCredit({ id, quantity }) {
  const { data } = await api.post(`/credits/${id}/buy`, { quantity });
  return data;
}


