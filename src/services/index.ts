import axios from 'axios';
import { API_URL } from '../constants/baseUrl';

console.log('API_URL: ', API_URL);

export const API = axios.create({ baseURL: `${API_URL}/api/v1` })

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})