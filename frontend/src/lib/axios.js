import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkAccessibility = (url) => {
  return api.post('/accessibility/check', { url });
};

export const getReport = (reportId) => {
  return api.get(`/accessibility/report/${reportId}`);
};

export const getReportsByUrl = (url) => {
  return api.get('/accessibility/reports', { params: { url } });
};

export default api;