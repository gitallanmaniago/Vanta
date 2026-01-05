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

  insertAttribute(data) {
    this.attribute.push(data);
    this.saveToLocalStorage();
  }

  deleteAttribute(attributeId){
    let result = false
    if(attributeId){
      this.attribute.forEach((value, index) => {
        if(value.id === Number(attributeId)){
          result = true;
          this.attribute.splice(index, 1);
        }
      });
    }

    this.saveToLocalStorage();
    return result;
  }
}