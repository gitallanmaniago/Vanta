import { Attributes } from "../../../data/Attributes.js";
import { Subcategory } from "../../../data/Subcategory.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { deleteDialog, renderModalAttributes, renderSubcategoryDialog, toast } from "../shared/admin-modal.js";

const TITLE = 'Category';
const SUBTITLE = 'Subcategory';

const attribute = new Attributes(TITLE);
const subcategory = new Subcategory(SUBTITLE);
const openCatElem = document.querySelector('.js-add-category');

openCatElem.addEventListener('click', () => {
  renderModalAttributes(TITLE);
  addCategory(TITLE);
});


function addCategory() {
  const attriButtonElem = document.querySelector(`.js-add-new-${TITLE}`);

  attriButtonElem.addEventListener('click', () => {
    const name = document.querySelector(`.js-attribute-${TITLE}`).value;
    const tempValue = [name];
    const result = fieldChecker(tempValue);

    if(result) {
      attribute.insertAttribute({ id: Math.random(), name });
      toast('Add category');
      renderCategory(attribute.searchAttribute(''));
    }
  });

}

function renderCategory(data) {
  const container = document.querySelector('.category-container');
  let containerHTML = '';
  data.forEach((value) => {
    containerHTML += `
      <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${value.id}</td>
      <td class="border-b border-gray-300 px-4 py-2">${value.name}</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-delete-category cursor-pointer" data-category-id=${value.id}>
          Delete
        </button>
      </td>
    </tr>
    
    `;
  });

  container.innerHTML = containerHTML;
  removeCategory();
}

renderCategory(attribute.searchAttribute(''));

function removeCategory() {
  const deleteElems = document.querySelectorAll('.js-delete-category');
  let result;
  deleteElems.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const categoryId = deleteButton.dataset.categoryId;
      deleteDialog();
      const deleteElem = document.querySelector('.js-delete-product');
      deleteElem.addEventListener('click', () => {
        deleteSubcategoryValue('Category', categoryId);
      });
    });
  });
}

searchCategory();

function searchCategory() {
  const searchElem = document.querySelector('.js-search-category');

  searchElem.addEventListener('input', () => {
    const searchWord = searchElem.value.trim();
    dynamicSearch({type: 'Category', searchWord})
  });
}

/*
*
* Subcategory functions
* Start of Subcategory 
* 
*/

const showDialogElem = document.querySelector('.js-add-subcategory');

showDialogElem.addEventListener('click', () => {
  renderSubcategoryDialog('Subcategory ');
  const addAttributeElem = document.querySelector('.js-add-subcategory-value');
  
  addAttributeElem.addEventListener('click', () => {
    const dropdownValue = getSelectedValues();
    const attributeValue = document.querySelector('.js-attribute-value').value;
    const result = fieldChecker([dropdownValue, attributeValue]);

    if(result) {
      subcategory.insertSubcategory({
        id: Math.random(), 
        categoryId: dropdownValue, 
        attributeValue
      });
      toast('Add subcategory values ');
      renderSubcategory(subcategory.searchSubcategory(''));
    }
  });
  
});

function getSelectedValues() {
  const attributeSelectElem = document.querySelector('.js-attribute-name');
  return attributeSelectElem.value;
}

function renderSubcategory (data) {
  const container = document.querySelector('.subcategory-container');
  let containerHTML = '';

  data.forEach((values) => {
    containerHTML += `
    <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${values.id}</td>
      <td class="border-b border-gray-300 px-4 py-2">${attribute.getMatchingAttribute(values.categoryId)?.name || ''}</td>
      <td class="border-b border-gray-300 px-4 py-2">${values.attributeValue}</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-delete-subcategory cursor-pointer" data-subcategory-id=${values.id}>
          Delete
        </button>
      </td>
    </tr>
    `
  });
  container.innerHTML = containerHTML;
  deleteSubcategory();
}

renderSubcategory(subcategory.searchSubcategory(''));

function deleteSubcategory() {
  const promtDeleteDialog = document.querySelectorAll('.js-delete-subcategory');
  promtDeleteDialog.forEach((deleteElem) => {
    const id = deleteElem.dataset.subcategoryId;
    deleteElem.addEventListener('click', () => {
      deleteDialog();
      deleteSubcategoryValue(null, id);
    });
  });
}

function searchSubcategory() {
  const searchElem = document.querySelector('.js-search-subcategory');
  searchElem.addEventListener('input', () => {
    const searchWord = searchElem.value.trim();
    dynamicSearch({type: 'AttributeValue', searchWord})
  });
}
searchSubcategory();

function deleteSubcategoryValue(module, id) {
  const deleteSubcategoryElem = document.querySelector('.js-delete-product');
    deleteSubcategoryElem.addEventListener('click', () => {
      let result;

      if(module) { 
        result = attribute.deleteAttribute(id); 
        subcategory.deleteSubcategory(null, id);
      } else
        result = subcategory.deleteSubcategory(id); 
    
      if(result){
        toast('Field deleted');
        renderCategory(attribute.searchAttribute(''));
        renderSubcategory(subcategory.searchSubcategory(''));
      }
    });
}

function dynamicSearch({type, searchWord}) {
  const search = {
    Category: () => {
      renderCategory(attribute.searchAttribute(searchWord));
    },
    AttributeValue: () => {
      renderSubcategory(subcategory.searchSubcategory(searchWord));
    }
  }
  const searchFunc = search[type];

  if(!searchFunc) return;

  searchFunc();
}
