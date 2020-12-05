import React from 'react';
import Chart from '../components/Chart';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const EditVibration: React.FC = (): React.ReactElement => (
  <>
    <div style={{ width: '90%', height: '600px' }}>
      <Chart />
    </div>

    <Fab variant='extended' color='primary' aria-label='add'>
      <AddIcon />
      Agregar nuevo punto
    </Fab>
  </>
);

export default EditVibration;
