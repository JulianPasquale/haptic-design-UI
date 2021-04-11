import { MouseEventHandler, ChangeEvent, EventHandler } from 'react';
import { PropTypes } from '@material-ui/core';

interface IDurationInputProps {
  onClick?: MouseEventHandler,
  onChange?: EventHandler<ChangeEvent<HTMLInputElement>>,
  color: PropTypes.Color,
  value: number | string,
};
