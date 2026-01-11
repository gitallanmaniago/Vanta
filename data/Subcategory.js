export class Subcategory {
  subcategoryData = []
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.subcategoryData));
  }

  loadFromLocalStorage() {
    this.subcategoryData = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertSubcategory(data) {
    this.subcategoryData.push(data);
    this.saveToLocalStorage();
  }

  searchSubcategory(char) {
    let tempValue = [];
    if(!char)
      return this.subcategoryData;

    if(char)
      this.subcategoryData.forEach((value) => {
        let attributeValue = value.attributeValue.toLowerCase();
        if(attributeValue.includes(char.toLowerCase()))
          tempValue.push(value);
      });  

    return tempValue;
  }

  deleteSubcategory(subcategoryId, categoryId){
    let result = false
    if(subcategoryId){
      this.subcategoryData.forEach((value, index) => {
        if(value.id === Number(subcategoryId)){
          result = true;
          this.subcategoryData.splice(index, 1);
        }
      });
    }

    if(categoryId) {
      const originalLength = this.subcategoryData.length;
      this.subcategoryData = this.subcategoryData.filter(value => Number(value.categoryId) !== Number(categoryId));

      result = this.subcategoryData != this.originalLength;
    }

    this.saveToLocalStorage();
    return result;
  }

   getMatchingSubcategory(id) {
    return this.subcategoryData.find(item => item.id === Number(id)) || null;
  }

}
