import { Products } from "./Products";
const product = new Products('Products');
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

  deleteFromInventory(inventoryId){
    let result = false;
    
    this.items.forEach((item, index) => {
      if(Number(item.inventoryId) === Number(inventoryId)){
        this.items.splice(index, 1);
        result = true;
      }
    });
    this.saveToLocalStorage();
    return result;
  }

  searchFromInventory(searchWord) {
    let tempValue = [];

    if(!searchWord)
      return this.items;

    if(searchWord){
      this.items.forEach((item) => {
        const itemName = product.getMatchingItem(item.productId)?.name.toLowerCase();
        if(itemName.includes(searchWord.toLowerCase())) 
          tempValue.push(item);
      });
    }
    return tempValue;
  }

}