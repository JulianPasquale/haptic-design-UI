import { APIResponse } from '../utils';

export interface IGlobalState {
  vibrations: IVibrationsState,
  vibrationDetails: IVibrationDetails,
  upsertVibration: IUpsertVibration,
};

interface Requestable {
  isLoading: boolean,
  error: boolean,
  requested: boolean,
};

interface IVibrationsState extends Requestable {
  records: Array<APIResponse>,
};

interface IVibrationDetails extends Requestable {
  details: APIResponse,
};

type IUpsertVibration = Requestable;
