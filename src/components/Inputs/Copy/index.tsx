import React, { ReactElement } from 'react';

// material-ui
import { InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';

import { ICopyInputProps } from './index.d';

export default ({ text }: ICopyInputProps): ReactElement => (
  <OutlinedInput
    endAdornment={
      <InputAdornment position='end' >
        <IconButton
          onClick={async () => { await navigator.clipboard.writeText(text) }}
          title='Copiar'
        >
          <FileCopy />
        </IconButton>
      </InputAdornment>
    }
    value={text}
  />
);
