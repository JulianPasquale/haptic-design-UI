import React, { FC, ReactElement } from 'react';

import { AppBar, Drawer } from '../../components/Layout';

// styled-components
import styled from 'styled-components';

const Container = styled.div`
  flexGrow: 1;
  backgroundColor: ${(props) => props.theme.palette.background.default};
  padding: ${(props) => props.theme.spacing(3)};
`

const Toolbar = styled.div`
  ${props => ({ ...props.theme.mixins.toolbar })};
`

export default (Component: FC): ReactElement => (
  <>
    <AppBar />
    <Drawer />

    <Container>
      <Toolbar />
      <Component />
    </Container>
  </>
);
