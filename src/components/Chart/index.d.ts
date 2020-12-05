export const TOP = 200;
export const BOTTOM = 0;
export const LEFT = 'dataMin';
export const RIGHT = 'dataMax';

export interface Point {
  name: number,
  value: number,
};

export interface ChartProps {
  data: Point[],
  handleDotClick: (e: any) => void,
};

export interface TooltipProps {
  active: boolean,
  payload: { [x: string]: string | number },
  label: string,
};
