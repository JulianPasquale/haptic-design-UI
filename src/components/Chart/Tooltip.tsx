import React, { FC, ReactElement } from 'react';
import { TooltipProps } from 'recharts';

const CustomTooltip: FC<TooltipProps> = ({ active, payload, label }): ReactElement | null => (
  active && payload ?
    <div style={{ backgroundColor: 'white' }}>
      <p className="label">{`${label} : ${payload[0].value}`}</p>
      <p className="desc">Anything you want can be displayed here.</p>
      <input type='number' autoFocus />
    </div> :
    null
);

export default CustomTooltip;
