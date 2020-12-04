import React, { ReactElement, useState } from 'react';
import { IState } from './chart.d'
import data from './data'

import AreaChart from './AreaChart'

// import CustomTooltip from './Tooltip'

const initialState: IState = {
  data
};

export default (): ReactElement => {
  const [state, setState] = useState(initialState);

  const handleDotClick = (e: any) => {
    debugger;
  };

  return (
    <AreaChart
      data={state.data}
      handleDotClick={handleDotClick}
    />
  );
};
