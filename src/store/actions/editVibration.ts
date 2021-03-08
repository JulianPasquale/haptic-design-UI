import { Action, ActionType } from '..';
import { client, APIResponse, UpsertPayload } from '../../utils';

// actions
import { showVibration } from '.';

const dispatchSuccess = async (dispatch: React.Dispatch<Action>, response: APIResponse) => {
  dispatch({ type: ActionType.EDIT_VIBRATION_SUCCESS, data: response });
};

const refreshVibrationDetails = async (dispatch: React.Dispatch<Action>, vibrationId: string) => {
  showVibration(dispatch, vibrationId);
};

export default async (dispatch: React.Dispatch<Action>, payload: UpsertPayload): Promise<void> => {
  dispatch({ type: ActionType.EDIT_VIBRATION });

  try {
    const response = await client.upsert(payload);

    Promise.all(
      [
        dispatchSuccess(dispatch, response.data as APIResponse),
        refreshVibrationDetails(dispatch, (response.data as APIResponse).id),
      ]
    );
  } catch (error) {
    dispatch({ type: ActionType.EDIT_VIBRATION_ERROR, error });
  };
};