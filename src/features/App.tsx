import React, { useState, ChangeEvent, useEffect } from 'react';

import styles from './styles.scss';
import { Grid } from './Grid';
import { useInterval } from '../hooks/useInterval';
import { Button } from '../components/Button/Button';
import { loadPreset, presets } from './presets';
import { countNeighbors, isAlive, defaultGrid } from './gameRules';

export const App: React.FC = () => {
  const [grid, setGrid] = useState(defaultGrid);
  const [isRunning, setIsRunning] = useState(false);
  const [populationHistory, setHistory] = useState<number[][][]>([]);

  const handleCellClick = (x: number, y: number) => {
    const newGrid = [...grid];
    newGrid[y][x] = 1 - grid[y][x];
    setGrid(newGrid);
  };

  const handleAddCol = () => {
    const newGrid = grid.reduce((acc, next) => {
      return [...acc, [...next, 0]];
    }, [] as number[][]);
    setGrid(newGrid);
  };

  const handleRemovewCol = () => {
    const newGrid = grid.reduce((acc, next) => {
      next.length = next.length - 1;
      return [...acc, [...next]];
    }, [] as number[][]);
    setGrid(newGrid);
  };

  const handleAddRow = () => {
    const rowSize = grid[0].length;
    setGrid([...grid, [...Array(rowSize).keys()].map((_) => 0)]);
  };

  const handleRemoveRow = () => {
    const newGrid = [...grid];
    newGrid.length = grid.length - 1;
    setGrid(newGrid);
  };

  const generatePopulation = () => {
    const nextGeneration = [...Array(grid.length).keys()].map((_) => [] as number[]);
    grid.forEach((row, rowIdx) => {
      row.forEach((_, colIdx) => {
        const count = countNeighbors(grid, [rowIdx, colIdx]);
        nextGeneration[rowIdx][colIdx] = Number(isAlive(count, grid[rowIdx][colIdx]));
      });
    });
    setGrid(nextGeneration);
    setHistory([...populationHistory, nextGeneration]);
  };

  const handleNext = () => {
    setIsRunning(false);
    generatePopulation();
  };

  const handlePrevious = () => {
    setIsRunning(false);
    const hist = [...populationHistory];
    const grid = hist.pop();
    if (grid) {
      setGrid(grid);
      setHistory(hist);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setHistory([]);
    setGrid(defaultGrid);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPreset = e.target.value as keyof typeof presets;
    if (presets[newPreset]) {
      const newGrid = loadPreset({ y: grid.length, x: grid[0].length }, presets[newPreset]);
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    // history limit (20 records)
    if (populationHistory.length > 20) {
      setHistory(populationHistory.slice(-20));
    }
  }, [populationHistory]);

  useInterval(generatePopulation, isRunning ? 200 : null);

  return (
    <div className={styles.container}>
      <Grid onCell={handleCellClick} grid={grid} />
      <div className={styles.controls}>
        <div className={styles.controls__group}>
          <Button disabled={!populationHistory.length} onClick={handlePrevious}>
            Previous
          </Button>
          <Button onClick={() => setIsRunning(!isRunning)}>{isRunning ? <>Stop</> : <>Play</>}</Button>
          <Button onClick={handleNext}>Next</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
        <div className={styles.controls__group}>
          <Button onClick={handleAddCol}>Add col</Button>
          <Button onClick={handleAddRow}>Add row</Button>
          <Button onClick={handleRemovewCol}>Remove col</Button>
          <Button onClick={handleRemoveRow}>Remove row</Button>
        </div>
        <div className={styles.controls__group}>
          <label>
            <span>Presets:</span>
            <select onChange={handleSelect} className={styles.select}>
              <option />
              {Object.keys(presets).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};
