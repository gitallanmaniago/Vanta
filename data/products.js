export class Products {

  products = [];
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.products));
  }

  loadFromLocalStorage() {
     this.products = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertProducts(data) {
    this.products.push(data);
    this.saveToLocalStorage();
  }

  deleteProduct(itemId) {
    let result = false;
    this.products.forEach((item, index) => {
      if(item.id === Number(itemId)) {
        this.products.splice(index, 1);
        result = true;
      }
    });
    this.saveToLocalStorage();
    return result;
  }

  displayPrice(basePriceCents) {
    return (Math.round(basePriceCents) / 100).toFixed(2); 
  }

  getMatchingItem(itemId) {
    let tempValue = [];
    this.products.forEach((value) => {
      if(Number(value.id) === Number(itemId)) {
        tempValue = value;
      }
    });
    return tempValue;
  }

  searchProduct(char) {
    let tempValue = [];

    if(!char)
      return tempValue = this.products;

    if(char)
      this.products.forEach((item) => {
        let itemName = item.name.toLowerCase();
        if(itemName.includes(char.toLowerCase()))
          tempValue.push(item);
      });
    
    return tempValue;
  }

}

