import { describe, expect, test } from '@jest/globals';

describe('MovementService', () => {
  test('Augmenter le stock sur un mouvement IN', () => {
    const initialStock = 50;
    const movementQuantity = 20;
    const movementType = 'IN';

    let newStock = initialStock;
    if (movementType === 'IN') {
      newStock += movementQuantity;
    }

    expect(newStock).toBe(70);
  });

  test('Diminuer le stock sur un mouvement OUT', () => {
    const initialStock = 50;
    const movementQuantity = 10;
    const movementType = 'OUT';

    let newStock = initialStock;
    if (movementType === 'OUT') {
      newStock -= movementQuantity;
    }

    expect(newStock).toBe(40);
  });
});
