import React, { useState, useEffect, useMemo, FC, ReactElement } from 'react';

import { useParams } from "react-router-dom";

import VibrationChart, { VibrationChartProps } from './VibrationChart';

import { client, APIResponse } from '../../utils';

import { Typography, Grid, Fab } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DeleteForever } from '@material-ui/icons';

interface RouteParams {
  vibrationId: string;
};

const Container = (Component: FC<VibrationChartProps>): FC => (): ReactElement => {
  const [state, setState] = useState({} as APIResponse);
  const [requested, setRequested] = useState(false as boolean | string);
  const { vibrationId } = useParams<RouteParams>();
  const [deleted, setDeleted] = useState(false);
  const [founded, setFounded] = useState(true);

  useEffect(() => {
    if (requested == vibrationId) return
    client.details(vibrationId)
      .then((response) => {
        setState(response.data);
        setFounded(true);
        setDeleted(false);
      })
      .catch(() => {
        setFounded(false);
      });

    setRequested(vibrationId);

    return () => {
      setState({} as APIResponse);
    }
  }, [setState, vibrationId, requested, setRequested, setFounded, setDeleted]);


  const handleDeleteVibration = () => {
    client.delete(state.id).then((response) => {
      if (response.status == 204) {
        setDeleted(true);
      };
    });
  };

  const content = useMemo(
    () => {
      if (deleted) {
        return (
          <Alert variant='filled' severity='success'>
            La vibración ha sido borrada
          </Alert>
        )
      } else if (!founded) {
        return (
          <Alert variant='filled' severity='error'>
            La vibración no existe
          </Alert>
        )
      } else {
        return (
          <>
            <Grid container justify='space-around' alignItems='center'>
              <span></span>
              <Typography variant='h3' gutterBottom>
                {state.id}
              </Typography>

              <Fab
                variant='extended'
                color='secondary'
                aria-label='delete'
                onClick={handleDeleteVibration}
              >
                <DeleteForever />
                Borrar vibración
              </Fab>
            </Grid>

            <Component
              data={state}
            />
          </>
        )
      };
    },
    [founded, deleted, state]
  )

  return (
    <>
      <Grid container>
        {content}
      </Grid>
    </>
  );
};

export default Container(VibrationChart);
