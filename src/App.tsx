import React from 'react';

// material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';

// react-router-dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// styled-components
import styled, { ThemeProvider } from 'styled-components';

// layout
import withLayout from './utils/hocs/withLayout';

// modules
import EditVibration from './modules/EditVibration';
import Home from './modules/Home';

// utils
import { drawerWidth } from './utils';

// store
import { StateProvider } from './store';

const theme = createMuiTheme();

const StyledContainer = styled(Container)`
  display: flex;
  margin-left: ${drawerWidth};
`;

export default (): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StateProvider>
      <StyledContainer>
        <Router>
          <Switch>
            <Route path='/edit/:vibrationId'>
              {withLayout(EditVibration)}
            </Route>
            <Route path="/">
              {withLayout(Home)}
            </Route>
          </Switch>
        </Router>
      </StyledContainer>
    </StateProvider>
  </ThemeProvider>
);
