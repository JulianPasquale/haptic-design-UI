import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { NewVibrationProps } from './index.d';

// material-ui
import {
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

interface Payload {
  name: string,
  category: string,
};

const initialState: Payload = {
  name: '',
  category: '',
};

export default (
  {
    open,
    handleClose,
    handleSubmit,
  }: NewVibrationProps
): ReactElement => {
  const [payload, setPayload] = useState(initialState);

  useEffect(() => () => setPayload(initialState), [setPayload]);

  const submitCallback = useCallback(
    (): void => handleSubmit(payload),
    [handleSubmit, payload],
  );

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        Nueva Vibración
      </DialogTitle>

      <DialogContent>
        <Input
          autoFocus
          required
          margin='dense'
          fullWidth
          value={payload.name}
          // Type of event has to be any: https://github.com/mui-org/material-ui/issues/15400#issuecomment-484891583
          onChange={(event: any) => setPayload({ ...payload, name: event.target.value })}
        />

        <Input
          autoFocus
          required
          margin='dense'
          fullWidth
          value={payload.category}
          // Type of event has to be any: https://github.com/mui-org/material-ui/issues/15400#issuecomment-484891583
          onChange={(event: any) => setPayload({ ...payload, category: event.target.value })}
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
  );
};
