export class Inventory {
  items;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey; 
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    this.items = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertIntoInventory(data) {
    this.items.push(data);
    this.saveToLocalStorage();
  }

}