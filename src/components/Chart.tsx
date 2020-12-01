import React, { useState } from 'react';
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';

interface Point {
  name: number,
  cost: number,
  impression: number
};

interface IState {
  data: Point[],
  left: string | number,
  right: string | number,
  refAreaLeft: string | number,
  refAreaRight: string | number,
  top: string | number,
  bottom: string | number,
  animation: true,
}

const data: Point[] = [
  { name: 1, cost: 4.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 2.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 0.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222 },
  { name: 11, cost: 4.3, impression: 210 },
  { name: 12, cost: 4.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 9, impression: 400 },
  { name: 17, cost: 3, impression: 200 },
  { name: 18, cost: 2, impression: 50 },
  { name: 19, cost: 3, impression: 100 },
  { name: 20, cost: 7, impression: 100 },
];

const initialState: IState = {
  data,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin',
  animation: true,
};

const getAxisYDomain = (
  from: number,
  to: number,
  ref: keyof Point,
): number[] => {
  const refData: Point[] = data.slice(from - 1, to);

  return [
    Math.min(...refData.map((point: Point): number => point[ref])),
    Math.max(...refData.map((point: Point): number => point[ref])),
  ];
};

export default (): React.ReactElement => {
  const [state, setState] = useState(initialState);

  const zoom = (): void => {
    let { refAreaLeft, refAreaRight } = state;

    if (refAreaLeft === refAreaRight ||
      typeof refAreaLeft === 'string' ||
      typeof refAreaRight === 'string') {

      setState({
        ...state,
        refAreaLeft: '',
        refAreaRight: '',
      });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost');

    setState({
      ...state,
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    });
  }

  const zoomOut = (): void => {
    setState({
      ...state,
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin'
    });
  }

  return (
    <div style={{ userSelect: 'none' }}>
      <button onClick={zoomOut}>
        Zoom Out
      </button>

      <AreaChart
        width={800}
        height={400}
        data={state.data}
        onMouseDown={(e) => setState({ ...state, refAreaLeft: e.activeLabel })}
        onMouseMove={e => state.refAreaLeft && setState({ ...state, refAreaRight: e.activeLabel })}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          allowDataOverflow
          dataKey='name'
          domain={[state.left, state.right]}
          type='number'
        />

        <YAxis
          allowDataOverflow
          domain={[state.bottom, state.top]}
          type='number'
          yAxisId='1'
        />

        <Area yAxisId="1" type="monotone" dataKey="cost" stroke="#8884d8" animationDuration={300} />
        <Tooltip />

        {
          state.refAreaLeft &&
          state.refAreaRight && (
            <ReferenceArea
              yAxisId="1"
              x1={state.refAreaLeft}
              x2={state.refAreaRight}
              strokeOpacity={0.3}
            />
          )
        }
      </AreaChart>

    </div>
  );
}
