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
  name: string,
  category: string,
};

interface ApiClient {
  list: () => Promise<AxiosResponse>,
  upsert: (payload: UpsertPayload) => Promise<AxiosResponse>,
  details: (id: string) => Promise<AxiosResponse>,
  delete: (id: string) => Promise<AxiosResponse>,
};

interface UpsertPayload {
  category: string,
  name: string,
  data: VibrationData,
};

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: HEADERS,
});

const instance = (): ApiClient => (
  {
    list: () => client.get(`${BASE_URL}/vibrations`),
    upsert: (payload: UpsertPayload) => client.post(`${BASE_URL}/vibrations`, payload),
    details: (id: string) => client.get(`${BASE_URL}/vibrations/${id}`),
    delete: (id: string) => client.delete(`${BASE_URL}/vibrations/${id}`),
  }
);

export default instance();
