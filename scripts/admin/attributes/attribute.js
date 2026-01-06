import { Attributes } from "../../../data/Attributes.js";
import { AttributeValues } from "../../../data/AttributeValues.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { deleteDialog, renderModalAttributes, renderValueAttribute, toast } from "../shared/admin-modal.js";

const TITLE = 'Attribute';
const SUBTITLE = 'AttributeValue'

const attribute = new Attributes(TITLE);
const attributeValues = new AttributeValues(SUBTITLE);

const openAttriElem = document.querySelector('.js-add-attribute');
openAttriElem.addEventListener('click', () => {
  renderModalAttributes(TITLE);
  addAttribute(TITLE);
});


function addAttribute() {
  const attriButtonElem = document.querySelector(`.js-add-new-${TITLE}`);

  attriButtonElem.addEventListener('click', () => {
    const name = document.querySelector(`.js-attribute-${TITLE}`).value;
    const tempValue = [name];
    const result = fieldChecker(tempValue);

    if(result) {
      attribute.insertAttribute({ id: Math.random(), name });
      toast('Add attribute');
      renderAttribute(attribute.searchAttribute(''));
    }
  });

}

function renderAttribute(data) {
  const container = document.querySelector('.attribute-container');
  let containerHTML = '';
  data.forEach((value) => {
    containerHTML += `
      <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${value.id}</td>
      <td class="border-b border-gray-300 px-4 py-2">${value.name}</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-delete-attribute cursor-pointer" data-category-id=${value.id}>
          Delete
        </button>
      </td>
    </tr>
    
    `;
  });

  container.innerHTML = containerHTML;
  removeAttribute();
}

renderAttribute(attribute.searchAttribute(''));

function removeAttribute() {
  const deleteElems = document.querySelectorAll('.js-delete-attribute');
  let result;
  deleteElems.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const id = deleteButton.dataset.categoryId;
      deleteDialog();
      deleteAttribute('Attribute', id);
    });
  });
}

searchAttribute();

function searchAttribute() {
  const searchElem = document.querySelector('.js-search-attribute');

  searchElem.addEventListener('input', () => {
    const searchWord = searchElem.value.trim();
    if(searchWord === '')
      renderAttribute(attribute.searchAttribute(''));
    else 
      renderAttribute(attribute.searchAttribute(searchWord));

  });
}

/*
*
* Attribute Values functions
* Start of attribute values
* 
*/

const showDialogElem = document.querySelector('.js-add-values');

showDialogElem.addEventListener('click', () => {
  renderValueAttribute('Attribute value');
  const addAttributeElem = document.querySelector('.js-add-attribute-value');
  
  addAttributeElem.addEventListener('click', () => {
    const dropdownValue = getSelectedValues();
    const attributeValue = document.querySelector('.js-attribute-value').value;
    const result = fieldChecker([dropdownValue, attributeValue]);

    if(result) {
      attributeValues.insertAttributeValue({
        id: Math.random(), 
        categoryId: dropdownValue, 
        attributeValue
      });
      toast('Add attribute values ');
      renderAttributeValues();
    }
  });
  
});

function getSelectedValues() {
  const attributeSelectElem = document.querySelector('.js-attribute-name');
  return attributeSelectElem.value;
}

function renderAttributeValues (data) {
  const container = document.querySelector('.attribute-values-container');
  let containerHTML = '';

  attributeValues.attributeValues.forEach((values) => {
    containerHTML += `
    <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${values.id}</td>
      <td class="border-b border-gray-300 px-4 py-2">${attribute.getMatchingAttribute(values.categoryId)?.name || ''}</td>
      <td class="border-b border-gray-300 px-4 py-2">${values.attributeValue}</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-delete-attribute-value cursor-pointer" data-attribute-value-id=${values.id}>
          Delete
        </button>
      </td>
    </tr>
    `
  });
  container.innerHTML = containerHTML;
  deleteAttributeValue();
}

renderAttributeValues();

function deleteAttributeValue() {
  const promtDeleteDialog = document.querySelectorAll('.js-delete-attribute-value');
  promtDeleteDialog.forEach((deleteElem) => {
    const id = deleteElem.dataset.attributeValueId;
    deleteElem.addEventListener('click', () => {
      deleteDialog();
      deleteAttribute(null, id);
    });
  });
  
}

function deleteAttribute(module, id) {
  const deleteAttributeElem = document.querySelector('.js-delete-product');
    deleteAttributeElem.addEventListener('click', () => {
      let result;
      
      if(module) { 
        result = attribute.deleteAttribute(id); 
        attributeValues.deleteAttributeValue(null, id);
      } else
        result = attributeValues.deleteAttributeValue(id); 
    
      if(result){
        toast('Field deleted');
        renderAttribute(attribute.searchAttribute(''));
        renderAttributeValues();
      }
    });
}