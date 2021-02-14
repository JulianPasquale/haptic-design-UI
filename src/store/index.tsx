import React, { createContext, useReducer, ReactElement } from 'react';
import { IGlobalState } from './index.d';
import { APIResponse } from '../utils';
import { reducer, Action } from './reducer';

const initialState: IGlobalState = {
  vibrations: {
    isLoading: false,
    records: [],
    requested: false,
  },
  vibrationDetails: {
    isLoading: false,
    details: {} as APIResponse,
  },
};

interface IStore {
  state: IGlobalState;
  dispatch: React.Dispatch<Action>;
}

export const store = createContext<IStore>({ state: initialState } as IStore);

interface IStateProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any,
};

export const StateProvider = ({ children }: IStateProvider): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <store.Provider value={{ state, dispatch }}>
      {children}
    </store.Provider>
  );
};
