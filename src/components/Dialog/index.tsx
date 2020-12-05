import React from 'react';
import FormDialog from './FormDialog';
import { DialogProps } from './index.d';

export const EditFormDialog: React.FC<DialogProps> = (props: DialogProps): React.ReactElement => (
  <FormDialog {...props} header='Editar' />
)

export const NewFormDialog: React.FC<DialogProps> = (props: DialogProps): React.ReactElement => (
  <FormDialog {...props} header='Nuevo' />
)

export default FormDialog;
