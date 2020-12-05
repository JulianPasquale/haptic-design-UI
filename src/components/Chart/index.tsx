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

import { ChartProps, TOP, BOTTOM, LEFT, RIGHT } from './index.d'

// import Tooltip from './Tooltip'

export type { Point } from './index.d';

const Chart: React.FC<ChartProps> = ({ data, handleDotClick }: ChartProps): ReactElement => (
  <ResponsiveContainer>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray='3 3' />

      <XAxis
        dataKey='name'
        domain={[LEFT, RIGHT]}
        type='number'
      />

      <YAxis
        allowDataOverflow
        domain={[BOTTOM, TOP]}
        type='number'
      />

      <Tooltip />

      <Area
        type='monotone'
        dataKey='value'
        stroke='#8884d8'
        animationDuration={300}
        activeDot={{ onClick: handleDotClick, cursor: 'pointer' }}
      />

    </AreaChart>
  </ResponsiveContainer>
);

export default Chart;
