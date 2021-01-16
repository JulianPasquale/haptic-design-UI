import React from 'react';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

import { drawerWidth } from '../../utils/constants';

const CustomAppBar = styled(AppBar)`
  width: calc(100% - ${drawerWidth}px);
  marginLeft: ${drawerWidth};
`;

export default (): React.ReactElement => (
  <CustomAppBar position='fixed'>
    <Toolbar>
      <Typography variant='h6' noWrap>
        Haptic Design
      </Typography>
    </Toolbar>
  </CustomAppBar>
)
