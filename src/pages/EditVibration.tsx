import React from 'react';
import Chart from '../components/Chart';

// material-ui
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

const EditVibration: React.FC = (): React.ReactElement => (
  <Grid container>
    <Grid item xs={12}>
      <div style={{ width: '90%', height: '600px' }}>
        <Chart />
      </div>
    </Grid>

    <Grid item xs={12}>
      <Grid container justify='flex-end' alignItems='flex-end' >
        <Fab variant='extended' color='primary' aria-label='add'>
          <AddIcon />
          Agregar nuevo punto
        </Fab>
      </Grid>
    </Grid>
  </Grid>
);

export default EditVibration;
