import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { DialogProps } from './index.d';

// material-ui
import {
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

export default (
  {
    open,
    dotIndex,
    payload,
    title,
    header,
    handleClose,
    handleSubmit,
  }: DialogProps
): ReactElement => {
  const [value, setValue] = useState(String(payload?.value))

  const submitCallback = useCallback(
    (): void => handleSubmit(dotIndex, parseFloat(value)),
    [handleSubmit, dotIndex, value],
  );

  useEffect((): void => setValue(String(payload?.value)), [setValue, payload]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{header}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {title}
        </DialogContentText>

        <Input
          autoFocus
          required
          margin='dense'
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
