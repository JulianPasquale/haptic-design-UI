import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

interface Point {
  name: number,
  value: number,
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
};

// interface ClickEvent {
//   chartX: number,
//   chartY: number,
//   activeCoordinate: {
//     x: number,
//     y: number,
//   },
//   activeLabel: number,
// };

const data: Point[] = [
  { name: 1, value: 4.11, },
  { name: 2, value: 2.39, },
  { name: 3, value: 1.37, },
  { name: 4, value: 1.16, },
  { name: 5, value: 2.29, },
  { name: 6, value: 3, },
  { name: 7, value: 0.53, },
  { name: 8, value: 2.52, },
  { name: 9, value: 1.79, },
  { name: 10, value: 2.94, },
  { name: 11, value: 4.3, },
  { name: 12, value: 4.41, },
  { name: 13, value: 2.1, },
  { name: 14, value: 8, },
  { name: 15, value: 0, },
  { name: 16, value: 9, },
  { name: 17, value: 3, },
  { name: 18, value: 2, },
  { name: 19, value: 3, },
  { name: 20, value: 7, },
];

const initialState: IState = {
  data,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 0,
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
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'value');

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

  // const handleCLick = (event: ClickEvent): void => {
  //   if (!event || event === null) {
  //     return;
  //   };

  //   const { data } = state;
  //   const maxY = Math.max(...data.map((point: Point): number => point.value));
  //   const activeElem = data.findIndex(datum => datum.name === event.activeLabel);

  //   // If clicked location is after than the closer.
  //   let newElem;
  //   let dataToUpdate;
  //   if (event.activeCoordinate.x < event.chartX) {
  //     newElem = activeElem + 1;
  //     dataToUpdate = data.splice(activeElem + 1);
  //   } else {
  //     newElem = activeElem - 1;
  //     dataToUpdate = data.splice(activeElem);
  //   };

  //   const newAxis = Math.abs(maxY - event.chartY);

  //   const updatedData = [{ name: newElem + 1, value: event.chartY / 10 }];



  //   console.log(event);
  //   console.log(event.chartY);
  //   console.log(newAxis / 100);



  //   updatedData.push(
  //     ...dataToUpdate.map(datum => (
  //       { ...datum, name: datum.name + 1 }
  //     ))
  //   );

  //   setState(
  //     {
  //       ...state,
  //       data: [...data, ...updatedData],
  //     }
  //   )
  // };

  return (
    <div style={{ userSelect: 'none' }}>
      <button onClick={zoomOut}>
        Zoom Out
      </button>

      <AreaChart
        width={800}
        height={400}
        data={state.data}
      // onMouseDown={e => setState({ ...state, refAreaLeft: e.activeLabel })}
      // onMouseMove={e => state.refAreaLeft && setState({ ...state, refAreaRight: e.activeLabel })}
      // onClick={handleCLick}
      // onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis
          dataKey='name'
          domain={[state.left, state.right]}
          type='number'
        />

        <YAxis
          allowDataOverflow
          domain={[state.bottom, state.top]}
          type='number'
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          animationDuration={300}
        />

      </AreaChart>

    </div>
  );
}
