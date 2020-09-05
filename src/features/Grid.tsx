import React from 'react';

import styles from './styles.scss';
import { Cell } from '../components/Cell/Cell';

export const Grid: React.FC<{ grid: number[][]; onCell: (x: number, y: number) => void }> = ({ grid, onCell }) => {
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
    <div className={styles.grid} onClick={handleClick}>
      {grid.map((rows, rowIdx) => (
        <div className={styles.grid__row} key={rowIdx}>
          {rows.map((col, colIdx) => (
            <Cell key={colIdx} row={rowIdx} col={colIdx} isLive={Boolean(col)} />
          ))}
        </div>
      ))}
    </div>
  );
};
