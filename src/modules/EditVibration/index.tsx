import React, { useEffect, FC, ReactElement, useContext } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import VibrationChart, { VibrationChartProps } from './VibrationChart';

// material-ui
import { Typography, Grid, Fab } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DeleteForever } from '@material-ui/icons';

// utils
import { patternURLBuilder } from '../../utils';

// store
import { actions, store } from '../../store';

import { CopyInput } from '../../components/Inputs';

interface RouteParams {
  vibrationId: string;
};

const StyledGrid = styled(Grid)`
  height: 90vh;
  margin-top: 2%;
`;

const Container = (Component: FC<VibrationChartProps>): FC => (): ReactElement => {
  const { state, dispatch } = useContext(store);
  const { vibrationId } = useParams<RouteParams>();

  const { vibrationDetails } = state;

  useEffect(() => {
    if (!vibrationDetails.isLoading && vibrationDetails.requested !== vibrationId) {
      actions.showVibration(dispatch, vibrationId);
    };
  }, [state.vibrationDetails, dispatch, actions, vibrationId]);

  const handleDeleteVibration = async () => {
    await actions.deleteVibration(dispatch, vibrationDetails.details.id);
  };

  return (
    <>
      <StyledGrid container spacing={0}>
        {
          (vibrationDetails.error && vibrationDetails.requested == vibrationId &&
            <Alert variant='filled' severity='error'>
              Error al obtener los datos de la vibración
            </Alert>) ||
          <>
            <Grid
              container
              justify='space-around'
              alignItems='center'
              spacing={0}
              style={{ height: '5%' }}
            >
              <div>
                <CopyInput
                  text={patternURLBuilder(vibrationId)}
                />
              </div>

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
        }
      </StyledGrid>
    </>
  );
};

export default Container(VibrationChart);
