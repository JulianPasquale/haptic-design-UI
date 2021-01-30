import React from 'react';

// material-ui
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import styled from 'styled-components';

import { drawerWidth } from '../../utils/constants';

const CustomAppBar = styled(AppBar)`
  width: calc(100% - ${drawerWidth}px);
  marginLeft: ${drawerWidth}px;
`;

export default (): React.ReactElement => (
  <CustomAppBar position='fixed'>
    <Toolbar>
      <Typography variant='h6' noWrap>
        Haptic Design
      </Typography>
    </Toolbar>
  </CustomAppBar>
);
