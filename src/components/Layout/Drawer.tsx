import React, { ReactElement, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// material-ui
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@material-ui/core';
import { Vibration, Home, Add } from '@material-ui/icons';

// styled-components
import styled from 'styled-components';

// utils
import { drawerWidth, client, APIResponse } from '../../utils';

// dialog
import { NewVibrationForm, DialogState } from '../../components/Dialog';

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flexShrink: 0;
`;

const dialogInitialState: DialogState = {
  open: false,
};

export default (): ReactElement => {
  const [vibrations, setVibrations] = useState([] as APIResponse[]);
  const [dialogState, setDialogState] = useState(dialogInitialState);

  useEffect(() => {
    client.list().then((response) => {
      setVibrations(response.data);
    });
  }, [client, setVibrations]);

  const handleCloseDialog = (): void => setDialogState(dialogInitialState);

  const handleNewVibrationClick = (): void => setDialogState({ open: true });

  const handleNewVibrationSubmit = (payload: any): void => {
    console.log(payload);
    handleCloseDialog();
    // POST
  };

  return (
    <StyledDrawer
      variant='permanent'
      anchor='left'
      PaperProps={{ style: { width: drawerWidth } }}
    >
      <List>
        <ListItem
          component={Link}
          to='/'
          button
          key='home'
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>

        <ListItem
          component={Button}
          button
          onClick={handleNewVibrationClick}
          key='add'
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary='Nueva vibración' />
        </ListItem>

        <Divider />

        {
          vibrations.map((vibration) => (
            <ListItem
              component={Link}
              to={`/edit/${vibration.id}`}
              button
              key={vibration.id}
            >
              <ListItemIcon>
                <Vibration />
              </ListItemIcon>
              <ListItemText primary={vibration.id} />
            </ListItem>
          ))
        }
      </List>

      <NewVibrationForm
        {...dialogState}
        handleClose={handleCloseDialog}
        handleSubmit={handleNewVibrationSubmit}
      />

    </StyledDrawer>
  );
};
