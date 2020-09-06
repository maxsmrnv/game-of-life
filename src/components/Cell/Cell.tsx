import React from 'react';
import classNames from 'classnames';
import styles from './Cell.scss';

type TCell = {
  isLive: boolean;
  row: number;
  col: number;
};

const CellComponent: React.FC<TCell> = ({ isLive, row, col }) => {
  const className = classNames(styles.container, { [styles.container__live]: isLive });
  return <div data-row={row} data-col={col} className={className} />;
};

export const Cell = React.memo(CellComponent);
