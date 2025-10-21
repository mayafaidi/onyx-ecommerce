import axios from 'axios';

const AxiosIntanse = axios.create({
  baseURL: 'https://kashop1.runasp.net/api',
});

AxiosIntanse.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosIntanse;
