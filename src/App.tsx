import React from 'react';

// material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

// react-router-dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// modules
import EditVibration from './modules/EditVibration';
import Home from './modules/Home';

const App: React.FC = (): React.ReactElement => (
  <>
    <CssBaseline />
    <Container>
      <Router>
        <Switch>
          <Route path='/edit/:vibrationId?'>
            <EditVibration />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  </>
);

export default App;
