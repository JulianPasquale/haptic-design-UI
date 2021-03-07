import React, { ReactElement } from 'react';

// material-ui
import { InputAdornment, IconButton, Input } from '@material-ui/core';
import { Save, Timer } from '@material-ui/icons';

import { IDurationInputProps } from './index.d';

export default ({ onChange, onClick, color, value }: IDurationInputProps): ReactElement => (
  <Input
    startAdornment={
      <InputAdornment position='start'>
        <Timer />
      </InputAdornment>
    }
    endAdornment={
      <InputAdornment position='end'>
        <IconButton
          onClick={onClick}
          color={color}
        >
          <Save />
        </IconButton>
      </InputAdornment>
    }
    placeholder='Duración'
    value={value}
    onChange={onChange}
  />
);
