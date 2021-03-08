import { Action, ActionType } from '..';
import { client } from '../../utils';

// actions
import { listVibrations, showVibration } from '.';

const dispatchSuccess = async (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: ActionType.DELETE_VIBRATION_SUCCESS });
};

const refreshVibrationsList = async (dispatch: React.Dispatch<Action>) => {
  listVibrations(dispatch)
};

const refreshVibrationDetails = async (dispatch: React.Dispatch<Action>, vibrationId: string) => {
  showVibration(dispatch, vibrationId)
};

export default async (dispatch: React.Dispatch<Action>, vibrationId: string): Promise<void> => {
  dispatch({ type: ActionType.DELETE_VIBRATION });

  try {
    await client.delete(vibrationId);

    Promise.all(
      [
        dispatchSuccess(dispatch),
        refreshVibrationsList(dispatch),
        refreshVibrationDetails(dispatch, vibrationId),
      ]
    );
  } catch (error) {
    dispatch({ type: ActionType.DELETE_VIBRATION_ERROR, error });
  };
};