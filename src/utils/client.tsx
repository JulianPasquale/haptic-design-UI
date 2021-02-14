import axios, { AxiosResponse } from 'axios';
import { BASE_URL, HEADERS } from '.';

import { ActionType, Action } from '../store/reducer';

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
  list: (dispatch: React.Dispatch<Action>) => Promise<void>,
  upsert: (payload: UpsertPayload) => Promise<AxiosResponse>,
  details: (id: string) => Promise<AxiosResponse>,
  delete: (id: string) => Promise<AxiosResponse>,
};

export interface UpsertPayload {
  category: string,
  name: string,
  data: VibrationData,
};

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: HEADERS,
});

const list = async (dispatch: React.Dispatch<Action>): Promise<void> => {
  dispatch({ type: ActionType.GET_VIBRATIONS_LIST });
  const response = await client.get(`${BASE_URL}/vibrations`);
  dispatch(
    {
      type: ActionType.GET_VIBRATIONS_LIST_SUCCESS,
      data: response.data as APIResponse[]
    }
  );
};

const instance: ApiClient = {
  list,
  upsert: (payload: UpsertPayload) => client.post(`${BASE_URL}/vibrations`, payload),
  details: (id: string) => client.get(`${BASE_URL}/vibrations/${id}`),
  delete: (id: string) => client.delete(`${BASE_URL}/vibrations/${id}`),
};

export default instance;
