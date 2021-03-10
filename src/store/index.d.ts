import { APIResponse } from '../utils';
import * as Actions from './actions'

export interface IGlobalState {
  vibrations: IVibrationsState,
  vibrationDetails: IVibrationDetails,
  createVibration: ICreateVibration,
  editVibration: IEditVibration,
  deleteVibration: IDeleteVibration,
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
type IDeleteVibration = Requestable;

export interface IActions {
  [x: keyof Actions]: () => Actions.x
};
