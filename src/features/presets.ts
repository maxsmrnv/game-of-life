type Preset = {
  x: number;
  y: number;
  rle: string;
};

export const presets = {
  Heavyweight: {
    x: 7,
    y: 5,
    rle: '3b2o2b$bo4bo$o6b$o5bo$6o',
  },
  Gilder: {
    x: 3,
    y: 3,
    rle: 'bo$2bo$3o',
  },
  PentaDecathlon: {
    x: 10,
    y: 3,
    rle: '2bo4bo2b$2ob4ob2o$2bo4bo',
  },
  Pulsar: {
    x: 12,
    y: 10,
    rle: '2b3o3b3o2b2$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o2b2$2b3o3b3o2b$o4bobo4bo$o4bobo4bo$o4bobo4bo2$2b3o3b3o',
  },
};

export const rleDecode = (text: string): string => {
  return text.replace(/(\d+)([ \w])/g, (_, count: number, chr: string) => chr.repeat(count));
};

export const loadPreset = (gridSize: { x: number; y: number }, preset: Preset): number[][] => {
  const start = { x: Math.floor(gridSize.x / 2 - preset.x / 2), y: Math.floor(gridSize.y / 2 - preset.y / 2) };
  let shiftX = 0;
  let shiftY = 0;
  const decoded = rleDecode(preset.rle);
  return [...decoded].reduce(
    (grid, next) => {
      switch (next) {
        case 'b': {
          // b	- dead cell
          shiftX += 1;
          break;
        }
        case 'o': {
          // o	- alive cell
          grid[start.y + shiftY][start.x + shiftX] = 1;
          shiftX += 1;
          break;
        }
        case '$': {
          // $	- end of line
          shiftX = 0;
          shiftY += 1;
          break;
        }
      }
      return grid;
    },
    [...Array(gridSize.y).keys()].map((_) => [...Array(gridSize.x).keys()].map((_) => 0))
  );
};
