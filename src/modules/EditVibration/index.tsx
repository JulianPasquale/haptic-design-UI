import React, { useState, useRef } from 'react';

// material-ui
import { Fab, Grid, Input, IconButton, Divider, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

// Chart
import Chart from '../../components/Chart';
import data from '../../components/Chart/data';

// Dialog
import FormDialog, { DialogState } from '../../components/Dialog';

const initialState = {
  duration: 1,
  data,
};

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
    if ((!index && index !== 0) || (!value && value !== 0)) {
      return;
    };

    // Duplicate array.
    const data = state.data.slice();
    data[index] = {
      name: index,
      value: value,
    };

    setState({ ...state, data });
    handleClose();
  };

  const durationInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div style={{ width: '90%', height: '600px' }}>
            <Chart
              data={state.data}
              handleDotClick={handleDotClick}
              right={state.duration}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify='flex-end' alignItems='flex-end'>
            <Fab variant='extended' color='primary' aria-label='add' onClick={handleNewDotClick}>
              <AddIcon />
              Agregar nuevo punto
            </Fab>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper
            component='form'
            onSubmit={
              (event: any) => {
                event.preventDefault();

                let duration = '1';
                if (durationInputRef && durationInputRef.current) {
                  duration = durationInputRef?.current.value;
                };

                setState({ ...state, duration: parseInt(duration, 10) });
              }
            }
          >
            <Input
              autoFocus
              required
              margin='dense'
              type='number'
              defaultValue={1}
              inputRef={durationInputRef}
            // value={state.duration}
            // Type of event has to be any: https://github.com/mui-org/material-ui/issues/15400#issuecomment-484891583
            // onChange={(event: any) => setState({ ...state, duration: parseInt(event.target.value || 0, 10) })}
            />
            <IconButton type='submit' aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
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
