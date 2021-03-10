import React, { createContext, useReducer, ReactElement } from 'react';
import { IGlobalState, IActions } from './index.d';
import { APIResponse } from '../utils';
import { reducer, Action } from './reducer';
import * as Actions from './actions';

const initialState: IGlobalState = {
  vibrations: {
    isLoading: false,
    requested: false,
    error: false,
    records: [],
  },
  vibrationDetails: {
    isLoading: false,
    requested: false,
    error: false,
    details: {} as APIResponse,
  },
  createVibration: {
    isLoading: false,
    requested: false,
    error: false,
  },
  editVibration: {
    isLoading: false,
    requested: false,
    error: false,
  },
  deleteVibration: {
    isLoading: false,
    requested: false,
    error: false,
  },
};

interface IStore {
  state: IGlobalState,
  dispatch: React.Dispatch<Action>,
  actions: IActions,
};

export const store = createContext<IStore>({ state: initialState } as IStore);

interface IStateProvider {
  children: ReactElement,
};

export const StateProvider = ({ children }: IStateProvider): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {} as IActions;
  for (const [key, value] of Object.entries(Actions)) {
    actions[key] = () => 
  }

  return (
    <store.Provider value={{ state, dispatch }}>
      {children}
    </store.Provider>
  );
};

export { reducer, ActionType } from './reducer';
export type { Action } from './reducer';

export * as actions from './actions';
