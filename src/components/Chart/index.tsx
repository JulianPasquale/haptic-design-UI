import React, { ReactElement, useState } from 'react';
import { IState } from './index.d'

import data from './data'
import AreaChart from './AreaChart'
import { EditFormDialog } from '../Dialog'


import { DialogState } from '../Dialog/index.d'
// import CustomTooltip from './Tooltip'

const initialState: IState = {
  data,
};

const dialogInitialState: DialogState = {
  open: false,
  payload: null,
  dotIndex: null,
  title: '',
};

export default (): ReactElement => {
  const [state, setState] = useState(initialState);
  const [dialogState, setDialogState] = useState(dialogInitialState);

  const handleClickOpen = (e: any) => {
    setDialogState({
      open: true,
      payload: e.payload,
      dotIndex: e.index,
      title: `Editar punto ${e.payload.name}`,
    });
  };

  const handleClose = () => {
    setDialogState(dialogInitialState);
  };

  const handleUpdateDot = (index: number | null, value: number | undefined) => {
    if (!index || !value) {
      return;
    };

    const { data } = state;
    data[index].value = value;

    setState({ data });
  };

  return (
    <>
      <AreaChart
        data={state.data}
        handleDotClick={handleClickOpen}
      />
      <EditFormDialog
        {...dialogState}
        handleClose={handleClose}
        handleSubmit={handleUpdateDot}
      />
    </>
  );
};
