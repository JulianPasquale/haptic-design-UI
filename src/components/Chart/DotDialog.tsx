import React, { ReactElement, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DialogProps } from './index.d';

export default ({ open, dotIndex, payload, handleClose, handleUpdateDot }: DialogProps): ReactElement => {
  const [value, setValue] = useState(payload?.value)

  const handleUpdate = useCallback(
    (): void => handleUpdateDot(dotIndex, value),
    [handleUpdateDot, dotIndex, value],
  );

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Editar</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {`Editar punto ${payload?.name}`}
        </DialogContentText>

        <TextField
          autoFocus
          margin='dense'
          label='value'
          type='number'
          fullWidth
          value={value}
          // Type of event has to be any: https://github.com/mui-org/material-ui/issues/15400#issuecomment-484891583
          onChange={(event: any) => setValue(event.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='default' variant='contained'>
          Cancelar
        </Button>

        <Button onClick={handleUpdate} color='primary' variant='contained'>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
};
