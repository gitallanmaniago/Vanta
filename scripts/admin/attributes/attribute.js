import { Attributes } from "../../../data/Attributes.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { deleteDialog, renderModalAttributes, toast } from "../shared/admin-modal.js";

const TITLE = 'Attribute';

const attribute = new Attributes(TITLE);

const openCatElem = document.querySelector('.js-add-attribute');

openCatElem.addEventListener('click', () => {
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
  removeCategory();
}

renderAttribute(attribute.searchAttribute(''));

function removeCategory() {
  const deleteElems = document.querySelectorAll('.js-delete-attribute');
  let result;
  deleteElems.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const categoryId = deleteButton.dataset.categoryId;
      deleteDialog();
      const deleteElem = document.querySelector('.js-delete-product');
      deleteElem.addEventListener('click', () => {
        result = attribute.deleteAttribute(categoryId);
        if(result){
          toast('Delete attribute ');
          renderAttribute(attribute.searchAttribute(''));
        }
      });
    });
  });
}

searchCategory();

function searchCategory() {
  const searchElem = document.querySelector('.js-search-attribute');

  searchElem.addEventListener('input', () => {
    const searchWord = searchElem.value.trim();
    if(searchWord === '')
      renderAttribute(attribute.searchAttribute(''));
    else 
      renderAttribute(attribute.searchAttribute(searchWord));

  });
}