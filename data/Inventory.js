export class Inventory {
  item;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey; 
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.item));
  }

  loadFromLocalStorage() {
    this.item = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertIntoInventory(data) {
    this.item.push(data);
    this.saveToLocalStorage();
  }

}