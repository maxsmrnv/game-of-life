import React from 'react';

import styles from './Grid.scss';
import { Cell } from '../../components/Cell/Cell';

type TGrid = { grid: number[][]; onCell: (x: number, y: number) => void };

export const Grid: React.FC<TGrid> = ({ grid, onCell }) => {
  const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);

    if (!isNaN(row)) {
      onCell(col, row);
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      {grid.map((rows, rowIdx) => (
        <div className={styles.container__row} key={rowIdx}>
          {rows.map((col, colIdx) => (
            <Cell key={colIdx} row={rowIdx} col={colIdx} isLive={Boolean(col)} />
          ))}
        </div>
      ))}
    </div>
  );
};
