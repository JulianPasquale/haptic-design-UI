import axios, { AxiosResponse } from 'axios';
import { BASE_URL, HEADERS } from '.';

export interface VibrationPattern {
  name: number,
  value: number,
};

export interface VibrationData {
  duration: number,
  pattern: VibrationPattern[],
};

export interface APIResponse {
  id: string,
  data: VibrationData,
};

interface ApiClient {
  list: () => Promise<AxiosResponse>,
  upsert: () => Promise<AxiosResponse>,
  details: (id: string) => Promise<AxiosResponse>,
};

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: HEADERS,
});

const instance = (): ApiClient => (
  {
    list: () => client.get(`${BASE_URL}/vibrations`),
    upsert: () => client.post(`${BASE_URL}/vibrations`),
    details: (id: string) => client.get(`${BASE_URL}/vibrations/${id}`),
  }
);

export default instance();
