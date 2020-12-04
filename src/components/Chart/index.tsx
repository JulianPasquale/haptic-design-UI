import React, { ReactElement, useState } from 'react';
import { IState } from './chart.d'
import data from './data'

import AreaChart from './AreaChart'
import Dialog from './DotDialog'

const initialState: IState = {
  data
};

export default (): ReactElement => {
  const [state, setState] = useState(initialState);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AreaChart
        data={state.data}
        handleDotClick={handleClickOpen}
      />
      <Dialog
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
