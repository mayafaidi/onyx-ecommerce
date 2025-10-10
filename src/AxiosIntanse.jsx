import axios from 'axios';

const AxiosIntanse = axios.create({
  baseURL: 'https://kashop1.runasp.net/api', // بدون /Products
});

export default AxiosIntanse;
