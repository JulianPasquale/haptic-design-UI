export interface DialogState {
  open: boolean,
}

export interface DotFormDialogState extends DialogState {
  title: string,
  header: string,
  dotIndex: number | null,
  payload: {
    name: number,
    value: number,
  } | null,
};

export interface DotFormProps extends DotFormDialogState {
  handleClose: () => void,
  handleSubmit: (index: number | null, value: number | undefined) => void,
  handleDelete: (index: number | null) => void,
};

export interface NewVibrationProps extends DialogState {
  handleClose: () => void,
  handleSubmit: (payload) => void,
};
