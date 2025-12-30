export class User {
  user;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  insertUser(data) {
    this.user.push(data);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.user));
  }

  loadFromLocalStorage() {
    this.user = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }
}