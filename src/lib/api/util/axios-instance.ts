import axios, { type AxiosInstance } from 'axios';

let instance: AxiosInstance | null = null;

let instanceUnauthenticated: AxiosInstance | null = null;

export const getAxiosInstance = () => {
  if (instance === null) {
    const baseURL = 'http://198.211.105.95:8080';

    const token = localStorage.getItem('token');
    instance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return instance;
};

export const getAxiosInstanceUnauthenticated = () => {
  if (instanceUnauthenticated === null) {
    const baseURL = 'http://198.211.105.95:8080';

    instanceUnauthenticated = axios.create({ baseURL });
  }
  return instanceUnauthenticated;
};

export const resetAxiosInstance = () => {
  instance = null;
};
