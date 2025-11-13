const ShoppingList = require('../src/shoppingList');

describe('ShoppingList', () => {
  // Cycle 1
  test('should return empty array when no items added', () => {
    const shoppingList = new ShoppingList();
    expect(shoppingList.getAllItems()).toEqual([]);
  });

  // Cycle 2
  test('should add one item to the list', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    expect(shoppingList.getAllItems()).toEqual(['pain']);
  });

  // Cycle 3
  test('should add multiple items to the list', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    shoppingList.addItem('pain2');
    expect(shoppingList.getAllItems()).toEqual(['pain', 'pain2']);
  });

  // Cycle 4
  test('should remove an item from the list', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    shoppingList.addItem('pain2');
    shoppingList.removeItem('pain');
    expect(shoppingList.getAllItems()).toEqual(['pain2']);
  });

  // Cycle 5
  test('should throw error when adding empty item', () => {
    const shoppingList = new ShoppingList();
    expect(() => shoppingList.addItem('')).toThrow();
  });

  // Cycle 6
  test('should add item with purchased status false', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    const items = shoppingList.getAllItemsWithStatus();
    expect(items).toEqual([{ name: 'pain', purchased: false }]);
  });

  // Cycle 7
  test('should mark item as purchased', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    shoppingList.markAsPurchased('pain');
    const items = shoppingList.getAllItemsWithStatus();
    expect(items).toEqual([{ name: 'pain', purchased: true }]);
  });

  // Cycle 8
  test('should clear all items', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    shoppingList.addItem('pain2');
    shoppingList.clear();
    expect(shoppingList.getAllItems()).toEqual([]);
  });

  // Cycle 9
  test('should return total count of items', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    shoppingList.addItem('pain2');
    expect(shoppingList.getTotalCount()).toBe(2);
  });

  // Cycle 10
  test('should return count of unpurchased items', () => {
    const shoppingList = new ShoppingList();
    shoppingList.addItem('pain');
    shoppingList.addItem('pain2');
    shoppingList.markAsPurchased('pain');
    expect(shoppingList.getRemainingCount()).toBe(1);
  });
});
