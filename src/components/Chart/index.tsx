import React, { ReactElement } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { curveCardinal } from 'd3-shape';

import { ChartProps, TOP, BOTTOM, LEFT, RIGHT } from './index.d';

// import Tooltip from './Tooltip'

export type { Point } from './index.d';

const Chart: React.FC<ChartProps> = (
  {
    data,
    right = RIGHT,
    left = LEFT,
    top = TOP,
    bottom = BOTTOM,
    handleDotClick
  }: ChartProps
): ReactElement => (
  <ResponsiveContainer>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray='3 3' />

      <XAxis
        dataKey='name'
        domain={[left, right]}
        type='number'
      />

      <YAxis
        allowDataOverflow
        domain={[bottom, top]}
        type='number'
      />

      <Tooltip />

      <Area
        type={curveCardinal.tension(1)}
        dataKey='value'
        stroke='#8884d8'
        animationDuration={300}
        activeDot={
          {
            onClick: handleDotClick,
            cursor: 'pointer',
            stroke: 'white',
            fill: 'white',
            strokeWidth: 10
          }
        }
        dot={
          {
            stroke: 'black',
            strokeWidth: 10,
            fill: 'black'
          }
        }
      />

    </AreaChart>
  </ResponsiveContainer>
);

export default Chart;
