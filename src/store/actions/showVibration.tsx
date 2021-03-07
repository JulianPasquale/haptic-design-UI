import { Action, ActionType } from '..';
import { client, APIResponse } from '../../utils';

export default async (dispatch: React.Dispatch<Action>, vibrationId: string): Promise<void> => {
  dispatch({ type: ActionType.GET_VIBRATION_DETAILS });

  try {
    const response = await client.details(vibrationId);

    dispatch(
      {
        type: ActionType.GET_VIBRATION_DETAILS_SUCCESS,
        data: response.data as APIResponse,
      }
    );
  } catch (error) {
    dispatch(
      {
        type: ActionType.GET_VIBRATION_DETAILS_ERROR,
        error: error,
      }
    );
  };
};
