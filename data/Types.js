export class Types {

  types = [];
  #localStorageKey;
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.types));
  }

  loadFromLocalStorage() {
    this.types = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      id: 122,
      typeName: 'Hoodie'
    }];
  }

  insertType(data) {
    this.types.push(data);
    this.saveToLocalStorage();
  }

  searchType(char) {
    let tempValue = [];

    if(!char)
      return this.types;

    if(char) {
      this.types.forEach((value) => {
        const typeName = value.typeName.toLowerCase();
        if(typeName.includes(char.toLowerCase()))
          tempValue.push(value);
      });
    }
    return tempValue;
  }

  deleteType(typeId, subcategoryId) {
    let result = false;

    this.types.forEach((type, index) => {
      if(Number(type.id) === Number(typeId)){
        this.types.splice(index, 1);
        result = true;
      }
    });

    if(subcategoryId){
      this.types = this.types.filter(value => Number(value.subcategoryId) !== Number(subcategoryId));
    }

    this.saveToLocalStorage();
    return result;
  }

  getTypeBasedOnSubcategory(subcategoryId) {
    let tempValue = []
    this.types.forEach((value) => {
      if(Number(value.subcategoryId) === Number(subcategoryId))
        tempValue.push(value);
    });

    return tempValue;
  }

}