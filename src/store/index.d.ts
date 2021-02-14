import { APIResponse } from '../utils'

export interface IGlobalState {
  vibrations: IVibrationsState,
  vibrationDetails: IVibrationDetails,
}

interface Requestable {
  isLoading: boolean,
}

interface IVibrationsState extends Requestable {
  records: Array<APIResponse>,
  requested: boolean,
}

interface IVibrationDetails extends Requestable {
  details: APIResponse,
}
