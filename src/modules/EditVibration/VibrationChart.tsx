import React, { useState, useEffect, FC, ReactElement } from 'react';

// material-ui
import { Grid, Fab, InputAdornment, IconButton, Input } from '@material-ui/core';
import { Add, Save, Timer } from '@material-ui/icons';

// Chart
import Chart from '../../components/Chart';

// Dialog
import { DotForm, DotFormDialogState } from '../../components/Dialog';

import { APIResponse, client } from '../../utils';

const dialogInitialState: DotFormDialogState = {
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
  const [DotFormDialogState, setDotFormDialogState] = useState(dialogInitialState);

  useEffect(() => {
    setVibration(data);
  }, [setVibration, data])

  const handleDotClick = (e: any): void => setDotFormDialogState({
    open: true,
    payload: e.payload,
    dotIndex: e.index,
    title: `Editar punto ${e.payload.name}`,
    header: 'Editar',
  });

  const handleNewDotClick = (): void => {
    const newPosition = vibration.data.pattern.length;

    setDotFormDialogState({
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

  const handleClose = (): void => setDotFormDialogState(dialogInitialState);

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
    client.upsert(dupVibration);
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
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div style={{ width: '90%', height: '90%' }}>
            <Chart
              data={vibration?.data?.pattern || []}
              handleDotClick={handleDotClick}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify='space-around' alignItems='flex-end' >
            <Grid item>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <Timer />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => client.upsert(vibration)}
                      color={vibration?.data?.duration == data?.data?.duration ? 'default' : 'primary'}
                    >
                      <Save />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder='Duración'
                value={vibration?.data?.duration}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    setVibration({
                      ...vibration,
                      data: {
                        ...vibration.data,
                        duration: parseInt(event.target.value) || 0,
                      }
                    } as APIResponse)
                  }
                }
              />
            </Grid>
            <Grid item>
              <Fab variant='extended' color='primary' aria-label='add' onClick={handleNewDotClick}>
                <Add />
                Agregar nuevo punto
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DotForm
        {...DotFormDialogState}
        handleClose={handleClose}
        handleSubmit={handleUpdateDot}
        handleDelete={handleDeleteDot}
      />
    </>
  );
};

export default VibrationChart;
