export interface DialogState {
  open: boolean,
  title: string,
  dotIndex: number | null,
  payload: {
    name: number,
    value: number
  } | null,
};

export interface DialogProps extends DialogState {
  handleClose: () => void,
  handleSubmit: (index: number | null, value: number | undefined) => void,
};

export interface FormDialogProps extends DialogProps {
  header: string,
};
