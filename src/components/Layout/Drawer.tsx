import React, { ReactElement, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// material-ui
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

// styled-components
import styled from 'styled-components';

import { drawerWidth, client } from '../../utils';

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flexShrink: 0;
`;

export interface VibrationPattern {
  name: number,
  value: number,
};

export interface VibrationData {
  duration: number,
  pattern: VibrationPattern[],
};

export interface APIResponse {
  id: string,
  data: VibrationData,
};

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
        {
          vibrations.map((vibration) => (
            <ListItem
              component={Link}
              to={`/edit/${vibration.id}`}
              button
              key={vibration.id}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={vibration.id} />
            </ListItem>
          ))
        }
      </List>
    </StyledDrawer>
  );
};
