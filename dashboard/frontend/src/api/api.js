import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const systemsApi = {
  list: () => api.get('/systems').then(r => r.data),
  get: (id) => api.get(`/systems/${id}`).then(r => r.data),
  create: (data) => api.post('/systems', data).then(r => r.data),
  update: (id, data) => api.put(`/systems/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/systems/${id}`).then(r => r.data),
};

export const tasksApi = {
  list: (system_id) => api.get('/tasks', { params: { system_id } }).then(r => r.data),
  create: (data) => api.post('/tasks', data).then(r => r.data),
  update: (id, data) => api.put(`/tasks/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/tasks/${id}`).then(r => r.data),
};

export const trialsApi = {
  list: (system_id) => api.get('/trials', { params: { system_id } }).then(r => r.data),
  create: (data) => api.post('/trials', data).then(r => r.data),
  update: (id, data) => api.put(`/trials/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/trials/${id}`).then(r => r.data),
  sync: () => api.post('/trials/sync').then(r => r.data),
};

export const financialsApi = {
  summary: () => api.get('/financials/summary').then(r => r.data),
  charges: (system_id) => api.get('/financials/charges', { params: { system_id } }).then(r => r.data),
  createCharge: (data) => api.post('/financials/charges', data).then(r => r.data),
  updateCharge: (id, data) => api.put(`/financials/charges/${id}`, data).then(r => r.data),
  deleteCharge: (id) => api.delete(`/financials/charges/${id}`).then(r => r.data),
  payments: (system_id) => api.get('/financials/payments', { params: { system_id } }).then(r => r.data),
  createPayment: (data) => api.post('/financials/payments', data).then(r => r.data),
  deletePayment: (id) => api.delete(`/financials/payments/${id}`).then(r => r.data),
};

export const statsApi = {
  get: () => api.get('/stats').then(r => r.data),
};

export default api;
