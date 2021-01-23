import React, { ReactElement, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// material-ui
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Mail, Home } from '@material-ui/icons';

// styled-components
import styled from 'styled-components';

import { drawerWidth, client, APIResponse } from '../../utils';

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flexShrink: 0;
`;

export default (): ReactElement => {
  const [vibrations, setVibrations] = useState([] as APIResponse[]);

  useEffect(() => {
    client.list().then((response) => {
      setVibrations(response.data);
    });
  }, [client, setVibrations]);

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
        {
          vibrations.map((vibration) => (
            <ListItem
              component={Link}
              to={`/edit/${vibration.id}`}
              button
              key={vibration.id}
            >
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText primary={vibration.id} />
            </ListItem>
          ))
        }
      </List>
    </StyledDrawer>
  );
};
