export class User {
  user;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.user));
  }

  loadFromLocalStorage() {
    this.user = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  
  insertUser(data) {
    this.user.push(data);
    this.saveToLocalStorage();
  }

  getUser(data) {
    let matchingItem = '';
    this.user.forEach((value) => {
      if(value.email === data.email) {
        matchingItem = value;
        
      }
    });
    return matchingItem;
  }
}