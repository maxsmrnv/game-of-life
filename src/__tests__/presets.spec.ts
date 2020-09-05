import { loadPreset, rleDecode, presets } from './../features/presets';

describe('test rle decoder', () => {
  test('simple decode', () => {
    expect(rleDecode('2a3b$5x')).toEqual('aabbb$xxxxx');
  });
});

describe('test preset loader', () => {
  test('simple preset', () => {
    const preset = loadPreset({ x: 10, y: 1 }, { x: 3, y: 1, rle: 'b2o' });
    // start X point Math.floor(5-1.5) = 3;
    expect(preset).toEqual([[0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]);
  });

  test('glider', () => {
    const preset = loadPreset({ x: 10, y: 10 }, presets.Gilder);
    // start X point Math.floor(5-1.5) = 3;
    // start Y point Math.floor(5-1.5) = 3;
    // bo$2bo$3o
    expect(preset).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
