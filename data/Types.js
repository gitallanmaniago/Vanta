export class Types {

  types;
  #localStorageKey;
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(types));
  }

  loadFromLocalStorage() {
    types = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      id: 122,
      typeName: 'Hoodie'
    }];
  }

  insertType(data) {
    this.types.push(data);
    this.saveToLocalStorage();
  }

}