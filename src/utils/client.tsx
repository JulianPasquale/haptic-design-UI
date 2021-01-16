import axios, { AxiosResponse } from 'axios';
import { BASE_URL, HEADERS } from '.';

interface ApiClient {
  list: () => Promise<AxiosResponse>,
  upsert: () => Promise<AxiosResponse>
};

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: HEADERS,
});

const instance = (): ApiClient => (
  {
    list: () => client.get(`${BASE_URL}/vibrations`),
    upsert: () => client.post(`${BASE_URL}/vibrations`),
  }
);

export default instance();
