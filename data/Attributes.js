export class Attributes {
  attribute = []
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.attribute));
  }

  loadFromLocalStorage() {
    this.attribute = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertAttribute(localStorageKey, data) {
    this.#localStorageKey = localStorageKey;
    this.attribute.push(data);
  }
}