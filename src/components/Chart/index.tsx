import React, { ReactElement, useState } from 'react';
import { IState, DialogState } from './index.d'
import data from './data'

import AreaChart from './AreaChart'
import Dialog from './DotDialog'

// import CustomTooltip from './Tooltip'

const initialState: IState = {
  data,
};

const dialogInitialState: DialogState = {
  open: false,
  payload: null,
  dotIndex: null,
};

export default (): ReactElement => {
  const [state, setState] = useState(initialState);
  const [dialogState, setDialogState] = useState(dialogInitialState);

  const handleClickOpen = (e: any) => {
    setDialogState({ open: true, payload: e.payload, dotIndex: e.index });
  };

  const handleClose = () => {
    setDialogState({ open: false, payload: null, dotIndex: null });
  };

  const handleUpdateDot = (index: number | null, value: number | undefined) => {
    if (!index || !value) {
      return;
    };

    const { data } = state;
    data[index]['value'] = value;

    setState({ data });
  };

  return (
    <>
      <AreaChart
        data={state.data}
        handleDotClick={handleClickOpen}
      />
      <Dialog
        {...dialogState}
        handleClose={handleClose}
        handleUpdateDot={handleUpdateDot}
      />
    </>
  );
};
