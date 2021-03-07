import { IGlobalState } from './index.d';

import { APIResponse } from '../utils';

export enum ActionType {
  GET_VIBRATIONS_LIST = 'GET_VIBRATIONS_LIST',
  GET_VIBRATIONS_LIST_SUCCESS = 'GET_VIBRATIONS_LIST_SUCCESS',
  GET_VIBRATIONS_LIST_ERROR = 'GET_VIBRATIONS_LIST_ERROR',
  GET_VIBRATION_DETAILS = 'GET_VIBRATION_DETAILS',
  GET_VIBRATION_DETAILS_SUCCESS = 'GET_VIBRATION_DETAILS_SUCCESS',
  GET_VIBRATION_DETAILS_ERROR = 'GET_VIBRATION_DETAILS_ERROR',
  CREATE_VIBRATION = 'CREATE_VIBRATION',
  CREATE_VIBRATION_SUCCESS = 'CREATE_VIBRATION_SUCCESS',
  CREATE_VIBRATION_ERROR = 'CREATE_VIBRATION_ERROR',
  EDIT_VIBRATION = 'EDIT_VIBRATION',
  EDIT_VIBRATION_SUCCESS = 'EDIT_VIBRATION_SUCCESS',
  EDIT_VIBRATION_ERROR = 'EDIT_VIBRATION_ERROR',
};

export type Action =
  | { type: ActionType.GET_VIBRATIONS_LIST }
  | { type: ActionType.GET_VIBRATIONS_LIST_SUCCESS, data: Array<APIResponse> }
  | { type: ActionType.GET_VIBRATIONS_LIST_ERROR, error: ErrorEvent }
  | { type: ActionType.GET_VIBRATION_DETAILS }
  | { type: ActionType.GET_VIBRATION_DETAILS_SUCCESS, data: APIResponse }
  | { type: ActionType.GET_VIBRATION_DETAILS_ERROR, error: ErrorEvent }
  | { type: ActionType.CREATE_VIBRATION }
  | { type: ActionType.CREATE_VIBRATION_SUCCESS, data: APIResponse }
  | { type: ActionType.CREATE_VIBRATION_ERROR, error: ErrorEvent }
  | { type: ActionType.EDIT_VIBRATION }
  | { type: ActionType.EDIT_VIBRATION_SUCCESS, data: APIResponse }
  | { type: ActionType.EDIT_VIBRATION_ERROR, error: ErrorEvent };

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
    case ActionType.GET_VIBRATIONS_LIST_ERROR:
      return {
        ...prevState,
        vibrations: {
          ...prevState.vibrations,
          error: true,
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
    case ActionType.GET_VIBRATION_DETAILS_ERROR:
      return {
        ...prevState,
        vibrationDetails: {
          ...prevState.vibrationDetails,
          error: true,
        },
      };
    case ActionType.CREATE_VIBRATION:
      return {
        ...prevState,
        createVibration: {
          ...prevState.createVibration,
          isLoading: true,
        },
      };
    case ActionType.CREATE_VIBRATION_SUCCESS:
      return {
        ...prevState,
        createVibration: {
          ...prevState.createVibration,
          isLoading: false,
        },
      };
    case ActionType.CREATE_VIBRATION_ERROR:
      return {
        ...prevState,
        createVibration: {
          ...prevState.createVibration,
          error: true,
        },
      };
    case ActionType.EDIT_VIBRATION:
      return {
        ...prevState,
        editVibration: {
          ...prevState.editVibration,
          isLoading: true,
        },
      };
    case ActionType.EDIT_VIBRATION_SUCCESS:
      return {
        ...prevState,
        editVibration: {
          ...prevState.editVibration,
          isLoading: false,
        },
      };
    case ActionType.EDIT_VIBRATION_ERROR:
      return {
        ...prevState,
        editVibration: {
          ...prevState.editVibration,
          error: true,
        },
      };
    default:
      return prevState;
  }
};