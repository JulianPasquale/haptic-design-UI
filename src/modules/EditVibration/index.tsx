import React, { useState } from 'react';

// material-ui
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

// Chart
import Chart from '../../components/Chart';
import data from '../../components/Chart/data';

// Dialog
import FormDialog, { DialogState } from '../../components/Dialog';

const initialState = { data };

const dialogInitialState: DialogState = {
  open: false,
  payload: null,
  dotIndex: null,
  title: '',
  header: '',
};

const EditVibration: React.FC = (): React.ReactElement => {
  const [state, setState] = useState(initialState);
  const [dialogState, setDialogState] = useState(dialogInitialState);

  const handleDotClick = (e: any): void => setDialogState({
    open: true,
    payload: e.payload,
    dotIndex: e.index,
    title: `Editar punto ${e.payload.name}`,
    header: 'Editar',
  });

  const handleNewDotClick = (): void => {
    const newPosition = state.data.length;

    setDialogState({
      open: true,
      payload: {
        name: newPosition,
        value: 0,
      },
      dotIndex: newPosition,
      title: `Agregar punto ${newPosition}`,
      header: 'Nuevo',
    });
  };

  const handleClose = (): void => setDialogState(dialogInitialState);

  const handleUpdateDot = (index: number | null, value: number | undefined): void => {
    // 0 is considered as false.
    if (!index || (!value && value !== 0)) {
      return;
    };

    // Duplicate array.
    const data = state.data.slice();
    data[index] = {
      name: index,
      value: value,
    };

    setState({ data });
    handleClose();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div style={{ width: '90%', height: '600px' }}>
            <Chart
              data={state.data}
              handleDotClick={handleDotClick}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify='flex-end' alignItems='flex-end' >
            <Fab variant='extended' color='primary' aria-label='add' onClick={handleNewDotClick}>
              <AddIcon />
              Agregar nuevo punto
            </Fab>
          </Grid>
        </Grid>
      </Grid>

      <FormDialog
        {...dialogState}
        handleClose={handleClose}
        handleSubmit={handleUpdateDot}
      />
    </>
  );
};

export default EditVibration;
