import { countNeighbors, isAlive } from '../features/gameRules';

describe('test neighbors count function', () => {
  test('around counting', () => {
    const grid = [
      [1, 1, 1],
      [1, 8, 1],
      [1, 1, 1],
    ];
    expect(countNeighbors(grid, [1, 1])).toEqual(8);
  });

  test('counting values ​​across boundaries', () => {
    const grid = [
      [8, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ];
    expect(countNeighbors(grid, [0, 0])).toEqual(3);
  });

  test("abroad neighbors aren't counted", () => {
    const grid = [
      [0, 0, 0, 1, 1, 1],
      [0, 8, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    expect(countNeighbors(grid, [1, 1])).toEqual(0);
  });
});

describe('test cells populations', () => {
  test('Any live cell with two live neighbours survives', () => {
    expect(isAlive(2, 1)).toEqual(true);
  });

  test('Any live cell with three live neighbours survives', () => {
    expect(isAlive(3, 1)).toEqual(true);
  });

  test('Any dead cell with three live neighbours becomes a live cell', () => {
    expect(isAlive(3, 0)).toEqual(true);
  });

  test('All other live cells die in the next generation. Similarly, all other dead cells stay dead', () => {
    expect(isAlive(2, 0)).toEqual(false);
    expect(isAlive(4, 0)).toEqual(false);
    expect(isAlive(0, 0)).toEqual(false);

    expect(isAlive(1, 1)).toEqual(false);
    expect(isAlive(4, 1)).toEqual(false);
    expect(isAlive(0, 1)).toEqual(false);
  });
});
