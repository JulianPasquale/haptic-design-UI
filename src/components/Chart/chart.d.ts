export interface Point {
  name: number,
  value: number,
};

export interface IState {
  data: Point[],
};

export interface TooltipProps {
  active: boolean,
  payload: { [x: string]: string | number },
  label: string,
};
