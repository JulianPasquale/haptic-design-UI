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

// styled-components
import styled from 'styled-components';

// layout
import withLayout from './utils/hocs/withLayout';

// modules
import EditVibration from './modules/EditVibration';
import Home from './modules/Home';


const StyledContainer = styled(Container)`
  display: flex;
`;

const App: React.FC = (): React.ReactElement => (
  <>
    <CssBaseline />
    <StyledContainer>
      <Router>
        <Switch>
          <Route path='/edit/:vibrationId?'>
            <EditVibration />
          </Route>
          <Route path="/">
            {withLayout(Home)}
          </Route>
        </Switch>
      </Router>
    </StyledContainer>
  </>
);

export default App;
