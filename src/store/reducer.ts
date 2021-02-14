import { IGlobalState } from './index.d';

import { APIResponse } from '../utils';

export enum ActionType {
  GET_VIBRATIONS_LIST = 'GET_VIBRATIONS_LIST',
  GET_VIBRATIONS_LIST_SUCCESS = 'GET_VIBRATIONS_LIST_SUCCESS',
  GET_VIBRATIONS_LIST_ERROR = 'GET_VIBRATIONS_LIST_ERROR',
  GET_VIBRATION_DETAILS = 'GET_VIBRATION_DETAILS',
  GET_VIBRATION_DETAILS_SUCCESS = 'GET_VIBRATION_DETAILS_SUCCESS',
  GET_VIBRATION_DETAILS_ERROR = 'GET_VIBRATION_DETAILS_ERROR',
};

export type Action =
  | { type: ActionType.GET_VIBRATIONS_LIST }
  | { type: ActionType.GET_VIBRATIONS_LIST_SUCCESS, data: Array<APIResponse> }
  | { type: ActionType.GET_VIBRATION_DETAILS, payload: { id: string } }
  | { type: ActionType.GET_VIBRATION_DETAILS_SUCCESS, data: APIResponse };

export const reducer = (prevState: IGlobalState, action: Action): IGlobalState => {
  switch (action.type) {
    case ActionType.GET_VIBRATIONS_LIST:
      return {
        ...prevState,
        vibrations: {
          ...prevState.vibrations,
          isLoading: true,
        },
      };
    case ActionType.GET_VIBRATIONS_LIST_SUCCESS:
      return {
        ...prevState,
        vibrations: {
          ...prevState.vibrations,
          isLoading: false,
          requested: true,
          records: action.data,
        },
      };
    case ActionType.GET_VIBRATION_DETAILS:
      return {
        ...prevState,
        vibrationDetails: {
          ...prevState.vibrationDetails,
          isLoading: true,
        },
      };
    case ActionType.GET_VIBRATION_DETAILS_SUCCESS:
      return {
        ...prevState,
        vibrationDetails: {
          ...prevState.vibrationDetails,
          isLoading: false,
          details: action.data,
        },
      };
    default:
      return prevState;
  }
};