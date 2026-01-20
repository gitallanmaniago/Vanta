import { Inventory } from "../../../data/Inventory.js";
import { renderInventoryDialog, toast } from "../shared/admin-modal.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { Attributes } from "../../../data/Attributes.js";


const inventory = new Inventory('Inventory'); 
const attribute = new Attributes('Attribute');
const renderDialog = document.querySelector('.js-add-item');

renderDialog.addEventListener('click', () => {
  renderInventoryDialog();
  const addItemElem = document.querySelector('.js-add-new-product');
  addItemElem.addEventListener('click', () => {
    addItem();
  });
});

function addItem() {
  const sku = document.querySelector('.js-item-sku').value;
  const productId = document.querySelector('.js-item-product').value;
  const quantity = document.querySelector('.js-item-quantity').value;
  const threshold = document.querySelector('.js-item-quantity').value;
  const dropdownValue = getDropdownValues();
  const tempValue = [];

  tempValue.push(productId, ...dropdownValue, quantity, threshold );
  const result = fieldChecker(tempValue);
  if(result) {
    inventory.insertIntoInventory([{
      inventoryId: Math.random(),
      sku,
      productId,
      attributes: dropdownValue,
      quantity,
      threshold
    }]);
    toast('Item added');
  }
}

function getDropdownValues(){
  let tempValue = []
  attribute.attribute.forEach((value) => {
    const dropdownValue = document.querySelector(`.js-item-${value.name.toLowerCase()}`).value;
    const name = value.name.toLowerCase() + 'Id';
    tempValue.push(dropdownValue);
  });

  return tempValue;
}

function renderItems() {

}

