import React, { ReactElement, useCallback, useState } from 'react';
import { FormDialogProps } from './index.d';

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (
  {
    open,
    dotIndex,
    payload,
    title,
    header,
    handleClose,
    handleSubmit,
  }: FormDialogProps
): ReactElement => {
  const [value, setValue] = useState(payload?.value)

  const submitCallback = useCallback(
    (): void => handleSubmit(dotIndex, value),
    [handleSubmit, dotIndex, value],
  );

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{header}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {title}
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

        <Button onClick={submitCallback} color='primary' variant='contained'>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
};
