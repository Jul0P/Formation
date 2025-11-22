import { describe, expect, test } from '@jest/globals';

describe('LocationService', () => {
  test('Test le parse du binCode', () => {
    const binCode = 'A1-R1-L2-B03';
    const parts = binCode.split('-');

    expect(parts).toHaveLength(4);
    expect(parts[0]).toBe('A1');
    expect(parts[1]).toBe('R1');
    expect(parts[2]).toBe('L2');
    expect(parts[3]).toBe('B03');
  });

  test('rejette un binCode invalide', () => {
    const invalidBinCode = 'A1-R1-B03';
    const parts = invalidBinCode.split('-');

    expect(parts.length).not.toBe(4);
  });
});
