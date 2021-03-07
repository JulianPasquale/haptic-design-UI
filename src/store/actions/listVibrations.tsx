import { Action, ActionType } from '..';
import { client, APIResponse } from '../../utils';

export default async (dispatch: React.Dispatch<Action>): Promise<void> => {
  dispatch({ type: ActionType.GET_VIBRATIONS_LIST });

  try {
    const response = await client.list();
    dispatch(
      {
        type: ActionType.GET_VIBRATIONS_LIST_SUCCESS,
        data: response.data as APIResponse[]
      }
    );
  } catch (error) {
    dispatch(
      {
        type: ActionType.GET_VIBRATIONS_LIST_ERROR,
        error: error,
      }
    );
  };
};
