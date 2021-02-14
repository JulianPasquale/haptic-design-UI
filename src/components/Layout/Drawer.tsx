import React, { ReactElement, useState, useEffect, useContext, memo } from 'react';
import { store } from '../../store';

import { Link } from 'react-router-dom';

// material-ui
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Collapse } from '@material-ui/core';
import { Vibration, Home, Add, ExpandLess, ExpandMore, Folder } from '@material-ui/icons';

// styled-components
import styled from 'styled-components';

// utils
import { drawerWidth, client, APIResponse, initialData, UpsertPayload } from '../../utils';

// dialog
import { NewVibrationForm, DialogState } from '../../components/Dialog';

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flexShrink: 0;
`;

const dialogInitialState: DialogState = {
  open: false,
};

interface GroupedVibrations {
  [x: string]: Array<APIResponse>,
};

export default memo((): ReactElement => {
  const [groupedVibrations, setGroupedVibrations] = useState({} as GroupedVibrations);
  const [dialogState, setDialogState] = useState(dialogInitialState);
  const [expanded, setExpanded] = useState('');
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    if (!state.vibrations.requested) {
      client.list(dispatch);
    } else {
      const parsedResponse: GroupedVibrations = {};

      console.log(state.vibrations);
      if (state.vibrations.records.length == 0) debugger;

      state.vibrations.records.forEach((vibration: APIResponse) => {
        if (parsedResponse[vibration.category]) {
          parsedResponse[vibration.category].push(vibration);
        } else {
          parsedResponse[vibration.category] = [vibration];
        }
      });

      setGroupedVibrations(parsedResponse);
    };
  }, [state, dispatch, client, setGroupedVibrations])

  const handleCloseDialog = (): void => setDialogState(dialogInitialState);

  const handleNewVibrationClick = (): void => setDialogState({ open: true });

  const handleNewVibrationSubmit = async (payload: UpsertPayload): Promise<void> => {
    await client.upsert({ ...payload, data: initialData });
    handleCloseDialog();
  };

  const toggleExpand = (category: string) => {
    expanded == category ? setExpanded('') : setExpanded(category);
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
          Object.entries(groupedVibrations).map(([category, vibrations]) => (
            <React.Fragment key={category}>
              <ListItem
                button
                onClick={() => toggleExpand(category)}
              >
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={category} />
                {expanded == category ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse
                in={expanded == category}
                timeout='auto'
                unmountOnExit
              >
                <List component='div' disablePadding>
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
                        <ListItemText primary={vibration.name} />
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
            </React.Fragment>
          ))
        }
      </List>

      <NewVibrationForm
        {...dialogState}
        handleClose={handleCloseDialog}
        handleSubmit={handleNewVibrationSubmit}
      />

    </StyledDrawer >
  );
});
