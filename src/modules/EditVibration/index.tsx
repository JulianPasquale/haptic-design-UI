import React, { useEffect, useMemo, FC, ReactElement, useContext } from 'react';
import styled from 'styled-components';

import { useParams } from "react-router-dom";

import VibrationChart, { VibrationChartProps } from './VibrationChart';

// material-ui
import { Typography, Grid, Fab } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DeleteForever } from '@material-ui/icons';

// utils
import { client } from '../../utils';

// store
import { actions, store } from '../../store';

interface RouteParams {
  vibrationId: string;
};

const StyledGrid = styled(Grid)`
  height: 90vh;
  margin-top: 2%;
`

const Container = (Component: FC<VibrationChartProps>): FC => (): ReactElement => {
  const { state, dispatch } = useContext(store);
  const { vibrationId } = useParams<RouteParams>();

  const { vibrationDetails } = state;

  useEffect(() => {
    if (!vibrationDetails.isLoading && vibrationDetails.requested !== vibrationId) {
      actions.showVibration(dispatch, vibrationId)
    };
  }, [state.vibrationDetails, dispatch, actions, vibrationId])

  const handleDeleteVibration = async () => {
    await client.delete(vibrationDetails.details.id);
  };

  const content = useMemo(
    () => {
      if (vibrationDetails.error && vibrationDetails.details.id == vibrationId) {
        return (
          <Alert variant='filled' severity='error'>
            Error al obtener los datos de la vibración
          </Alert>
        )
      } else {
        return (
          <>
            <Grid
              container
              justify='space-around'
              alignItems='center'
              spacing={0}
              style={{ height: '5%' }}
            >
              <span></span>
              <Typography variant='h3' gutterBottom>
                {vibrationDetails.details.name}
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
              data={vibrationDetails.details}
            />
          </>
        )
      };
    },
    [vibrationDetails, vibrationId]
  )

  return (
    <>
      <StyledGrid container spacing={0}>
        {content}
      </StyledGrid>
    </>
  );
};

export default Container(VibrationChart);
