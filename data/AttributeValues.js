export class AttributeValues {
  attributeValues = []
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.attributeValues));
  }

  loadFromLocalStorage() {
    this.attributeValues = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertAttributeValue(data) {
    this.attributeValues.push(data);
    this.saveToLocalStorage();
  }

  searchAttributeValue(char) {
    let tempValue = [];
    if(!char)
      return tempValue = this.attributeValues;

    if(char)
      this.attributeValues.forEach((value) => {
        let attributeName = value.name.toLowerCase();
        if(attributeName.includes(char.toLowerCase()))
          tempValue.push(value);
      });  

    return tempValue;
  }

  deleteAttributeValue(attributeId, categoryId){
    let result = false
    if(attributeId){
      this.attributeValues.forEach((value, index) => {
        if(value.id === Number(attributeId)){
          result = true;
          this.attributeValues.splice(index, 1);
        }
      });
    }

    if(categoryId) {
      this.attributeValues.forEach((value, index) => {
        if(Number(value.categoryId) === Number(categoryId)){
          result = true;
          this.attributeValues.splice(index, 1);
        }
      });
    }

    this.saveToLocalStorage();
    return result;
  }

}
