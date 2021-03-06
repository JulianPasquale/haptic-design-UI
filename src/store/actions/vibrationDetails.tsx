import { Action, ActionType } from '..';
import { client, APIResponse } from '../../utils'

import { listVibrations } from '.';

const dispatchSuccess = async (dispatch: React.Dispatch<Action>, response: APIResponse) => {
  dispatch(
    {
      type: ActionType.GET_VIBRATION_DETAILS_SUCCESS,
      data: response
    }
  );
};

const refreshVibrationsList = async (dispatch: React.Dispatch<Action>) => {
  listVibrations(dispatch)
};

export default async (dispatch: React.Dispatch<Action>, vibrationId: string): Promise<void> => {
  dispatch({ type: ActionType.GET_VIBRATION_DETAILS });

  try {
    const response = await client.details(vibrationId);

    Promise.all(
      [
        dispatchSuccess(dispatch, response.data as APIResponse),
        refreshVibrationsList(dispatch),
      ]
    );
  } catch (error) {
    dispatch({ type: ActionType.GET_VIBRATION_DETAILS_ERROR, error });
  };
};