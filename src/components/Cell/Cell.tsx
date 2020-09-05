import React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

type TCell = {
  isLive: boolean;
  row: number;
  col: number;
};

export const Cell: React.FC<TCell> = ({ isLive, row, col }) => {
  const className = classNames(styles.container, { [styles.container__live]: isLive });
  return <div data-row={row} data-col={col} className={className} />;
};
