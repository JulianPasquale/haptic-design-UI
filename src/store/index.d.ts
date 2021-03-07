import { APIResponse } from '../utils';

export interface IGlobalState {
  vibrations: IVibrationsState,
  vibrationDetails: IVibrationDetails,
  createVibration: ICreateVibration,
  editVibration: IEditVibration,
};

interface Requestable {
  isLoading: boolean,
  error: boolean,
  requested: boolean | string,
};

interface IVibrationsState extends Requestable {
  records: Array<APIResponse>,
};

interface IVibrationDetails extends Requestable {
  details: APIResponse,
};

type ICreateVibration = Requestable;
type IEditVibration = Requestable;
