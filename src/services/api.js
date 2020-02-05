import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: 'https://localhost:44391/api',
  timeout: 1000,
  //headers: { 'X-My-Custom-Header': 'Header-Value' }
});

api.interceptors.request.use(async config => {
  const token = getToken();
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;