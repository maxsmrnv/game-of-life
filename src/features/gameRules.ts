// initial grid settings
const gridRowNum = 20;
const gridColNum = 20;
export const defaultGrid = [...Array(gridRowNum).keys()].map((_) => [...Array(gridColNum).keys()].map((_) => 0));

// grid looped coordinate search
export const findCoordinate = (idx: number, length: number): number => {
  if (idx === -1) {
    return length - 1;
  }
  if (idx === length) {
    return 0;
  }
  return idx;
};

// shifts to find neighbors
const neighborPositions = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 0],
  [0, -1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];
// count alive cell neighbors
export const countNeighbors = (grid: number[][], currentCell: [number, number]): number => {
  return neighborPositions.reduce((sum, next) => {
    const neighborRow = findCoordinate(currentCell[0] + next[0], grid.length);
    const neighborCol = findCoordinate(currentCell[1] + next[1], grid[0].length);
    const neighbor = grid[neighborRow][neighborCol];
    return sum + neighbor;
  }, 0);
};

export const isAlive = (neighborsCount: number, cellState: number): boolean => {
  if (cellState) {
    // live cell survives if it has two or three living neighbours, and dies otherwise.
    return neighborsCount === 2 || neighborsCount === 3;
  }
  // A new cell is born if it has exactly three neighbours,
  return neighborsCount === 3;
};
