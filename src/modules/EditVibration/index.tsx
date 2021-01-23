import React, { useState, useEffect, FC, ReactElement } from 'react';

import { useParams } from "react-router-dom";

import VibrationChart, { VibrationChartProps } from './VibrationChart';

import { client, APIResponse } from '../../utils';

interface RouteParams {
  vibrationId: string;
};

const Container = (Component: FC<VibrationChartProps>): FC => (): ReactElement => {
  const [state, setState] = useState({} as APIResponse);
  const [requested, setRequested] = useState(false as boolean | string);
  const { vibrationId } = useParams<RouteParams>();

  useEffect(() => {
    if (requested == vibrationId) return
    client.details(vibrationId).then((response) => {
      setState(response.data);
    });
    setRequested(vibrationId);

    return () => {
      setState({} as APIResponse);
    }
  }, [setState, state, vibrationId, requested, setRequested]);

  return (
    <Component
      data={state}
    />
  );
};

export default Container(VibrationChart);
