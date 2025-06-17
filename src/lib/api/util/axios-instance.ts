import axios, { type AxiosInstance } from 'axios';

let instance: AxiosInstance | null = null;

export const getAxiosInstance = () => {
  if (instance === null) {
    // TODO: set base URL
    const baseURL = 'http://backend.com:8080';

    const token = localStorage.getItem('token');
    instance = axios.create({
      baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
  }
  return instance;
};
