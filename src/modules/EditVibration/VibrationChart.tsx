import React, { useState, useEffect, FC, ReactElement } from 'react';

// material-ui
import { Typography, Grid, Fab, Chip } from '@material-ui/core';
import { Add, Vibration } from '@material-ui/icons';

// Chart
import Chart from '../../components/Chart';

// Dialog
import FormDialog, { DialogState } from '../../components/Dialog';

import { APIResponse } from '../../utils';
// import data from '../../components/Chart/data';

const dialogInitialState: DialogState = {
  open: false,
  payload: null,
  dotIndex: null,
  title: '',
  header: '',
};

export interface VibrationChartProps {
  data: APIResponse;
}

const VibrationChart: FC<VibrationChartProps> = ({ data }: VibrationChartProps): ReactElement => {
  const [vibration, setVibration] = useState(data);
  const [dialogState, setDialogState] = useState(dialogInitialState);

  useEffect(() => {
    setVibration(data);
  }, [setVibration, data])

  const handleDotClick = (e: any): void => setDialogState({
    open: true,
    payload: e.payload,
    dotIndex: e.index,
    title: `Editar punto ${e.payload.name}`,
    header: 'Editar',
  });

  const handleNewDotClick = (): void => {
    const newPosition = vibration.data.pattern.length;

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
    const newPattern = vibration.data.pattern.slice();

    newPattern[index] = {
      name: index + 1,
      value: value,
    };

    const dupVibration = { ...vibration } as APIResponse;
    dupVibration.data.pattern = newPattern;

    setVibration({ ...dupVibration });
    handleClose();
  };

  const handleDeleteDot = (index: number | null): void => {
    // 0 is considered as false.
    if (!index && index !== 0) return;

    // Duplicate array.
    const newPattern = vibration.data.pattern.slice();

    const unchanged = newPattern.slice(0, index);
    const toUpdate = newPattern.slice(index + 1).map(pattern => (
      { ...pattern, name: pattern.name - 1 }
    ));

    const dupVibration = { ...vibration } as APIResponse;
    dupVibration.data.pattern = [...unchanged, ...toUpdate];

    setVibration({ ...dupVibration });
    handleClose();
  };

  return (
    <>
      <Grid container>
        <Grid container justify='space-around' alignItems='center'>
          <span></span>
          <Typography variant='h3' gutterBottom>
            {vibration.id}
          </Typography>

          <Chip
            icon={<Vibration />}
            label='Borrar vibración'
            // onDelete={handleDelete}
            color='secondary'
          />
        </Grid>

        <Grid item xs={12}>
          <div style={{ width: '90%', height: '600px' }}>
            <Chart
              data={vibration?.data?.pattern || []}
              handleDotClick={handleDotClick}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify='flex-end' alignItems='flex-end' >
            <Fab variant='extended' color='primary' aria-label='add' onClick={handleNewDotClick}>
              <Add />
              Agregar nuevo punto
            </Fab>
          </Grid>
        </Grid>
      </Grid>

      <FormDialog
        {...dialogState}
        handleClose={handleClose}
        handleSubmit={handleUpdateDot}
        handleDelete={handleDeleteDot}
      />
    </>
  );
};

export default VibrationChart;