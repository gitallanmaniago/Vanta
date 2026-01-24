import { Inventory } from "../../../data/Inventory.js";
import { renderInventoryDialog, toast } from "../shared/admin-modal.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { Attributes } from "../../../data/Attributes.js";
import { Products } from "../../../data/Products.js";
import { AttributeValues } from "../../../data/AttributeValues.js";

const inventory = new Inventory('Inventory'); 
const attribute = new Attributes('Attribute');
const product = new Products('Products');
const attributeValues = new AttributeValues('AttributeValue');
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
  const threshold = document.querySelector('.js-item-threshold').value;
  const dropdownValue = getDropdownValues();
  const tempValue = [];
  tempValue.push(productId, ...Object.values(dropdownValue), quantity, threshold);
  const result = fieldChecker(tempValue);
  if(result) {
    const inventoryId = Math.random();
    let data = {
      inventoryId,
      sku,
      productId,
      attributes: dropdownValue,
      quantity,
      threshold
    }
    inventory.insertIntoInventory(data);
    toast('Item added');
  }
}

function getDropdownValues(){
  let tempValue = {};
  attribute.attribute.forEach((value) => {
    const dropdownValue = document.querySelector(`.js-item-${value.name.toLowerCase()}`).value;
    const name = value.name.toLowerCase() + 'Id';
    tempValue[name] = dropdownValue;
  });

  return tempValue;
}

function renderItems() {
  const container = document.querySelector('.inventory-container');
  let containerHTML = '';
  inventory.items.forEach((item) => {
    containerHTML += `
      <tr class="hover:bg-gray-50">
        <td class="border-b border-l border-gray-300 px-4 py-2">${item.sku}</td>
        <td class="border-b border-gray-300 px-4 py-2">${product.getMatchingItem(item.productId)?.name ?? ''}</td>
        <td class="border-b border-gray-300 px-4 py-2">${displayAttribute(item.attributes).join('<br>')}</td>
        <td class="text-center border-b border-gray-300 px-4 py-2">${item?.quantity ?? ''}</td>
        <td class="text-center border-b border-gray-300 px-4 py-2">${item?.threshold ?? ''}</td>
        <td class="border-b border-r border-gray-300 px-4 py-2 ">
          <button class="js-delete-category cursor-pointer" data-category-id=${item.id}>
            Delete
          </button>
        </td>
      </tr>
    `;
  });

  container.innerHTML = containerHTML;
}

renderItems();

function displayAttribute(data){
  let tempValue = [];
  attribute.attribute.forEach((value) => {
    const name = value.name.toLowerCase() + 'Id';
    const attributeValuesId = data[name];
    const values = attributeValues.getAttributeValues(attributeValuesId);
    tempValue.push(...values);
  });
  const attributeValue = tempValue.map(obj => obj.attributeValue);

  return attributeValue;
}

