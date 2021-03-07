import { Action, ActionType } from '..';
import { client, APIResponse, UpsertPayload, initialData } from '../../utils'

// actions
import { listVibrations } from '.';

const dispatchSuccess = async (dispatch: React.Dispatch<Action>, response: APIResponse) => {
  dispatch(
    {
      type: ActionType.CREATE_VIBRATION_SUCCESS,
      data: response
    }
  );
};

const refreshVibrationsList = async (dispatch: React.Dispatch<Action>) => {
  listVibrations(dispatch)
};

export default async (dispatch: React.Dispatch<Action>, payload: UpsertPayload): Promise<void> => {
  dispatch({ type: ActionType.CREATE_VIBRATION });

  try {
    const response = await client.upsert({ ...payload, data: initialData });

    Promise.all(
      [
        dispatchSuccess(dispatch, response.data as APIResponse),
        refreshVibrationsList(dispatch),
      ]
    );
  } catch (error) {
    dispatch({ type: ActionType.CREATE_VIBRATION_ERROR, error });
  };
};