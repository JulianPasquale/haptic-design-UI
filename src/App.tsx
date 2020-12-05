import React from 'react';
import EditVibration from './pages/EditVibration';

// material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const App: React.FC = (): React.ReactElement => (
  <>
    <CssBaseline />
    <Container>
      <EditVibration />
    </Container>
  </>
);

export default App;
