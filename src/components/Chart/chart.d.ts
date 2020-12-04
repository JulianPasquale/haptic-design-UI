export interface Point {
  name: number,
  value: number,
};

export interface IState {
  data: Point[],
};

export interface AreaChartProps {
  data: Point[],
  handleDotClick: (e: any) => void,
};

export interface DialogProps extends DialogState {
  handleClose: () => void,
  handleUpdateDot: (index: number | null, value: number | undefined) => void,
};

export interface DialogState {
  open: boolean,
  dotIndex: number | null,
  payload: {
    name: number,
    value: number
  } | null,
};

export interface TooltipProps {
  active: boolean,
  payload: { [x: string]: string | number },
  label: string,
};
