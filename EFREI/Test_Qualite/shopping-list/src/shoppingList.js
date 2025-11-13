class ShoppingList {
  constructor() {
    this.items = [];
  }

  getAllItems() {
    return this.items.map((item) => item.name);
  }

  addItem(name) {
    if (!name) {
      throw new Error('Item non valide');
    }
    this.items.push({ name, purchased: false });
  }

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
  }

  getAllItemsWithStatus() {
    return this.items;
  }

  markAsPurchased(name) {
    const item = this.items.find((item) => item.name === name);
    if (item) {
      item.purchased = true;
    }
  }

  clear() {
    this.items = [];
  }

  getTotalCount() {
    return this.items.length;
  }

  getRemainingCount() {
    return this.items.filter((item) => !item.purchased).length;
  }
}

module.exports = ShoppingList;
