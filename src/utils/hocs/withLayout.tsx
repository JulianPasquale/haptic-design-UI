import React, { FC, ReactElement } from 'react';

import { AppBar, Drawer } from '../../components/Layout';

export default (Component: FC): ReactElement => (
  <>
    <AppBar />
    <Drawer />
    <Component />
  </>
);
