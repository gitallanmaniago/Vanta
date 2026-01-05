import { Attributes } from "../../../data/Attributes.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { deleteDialog, renderModalAttributes, toast } from "../shared/admin-modal.js";

const TITLE = 'Category';

const attribute = new Attributes(TITLE);

const openCatElem = document.querySelector('.js-add-category');

openCatElem.addEventListener('click', () => {
  renderModalAttributes(TITLE);
  addCategory(TITLE);
});


function addCategory() {
  const attriButtonElem = document.querySelector(`.js-add-new-${TITLE}`);

  attriButtonElem.addEventListener('click', () => {
    const category = document.querySelector(`.js-attribute-${TITLE}`).value;
    const tempValue = [category];
    const result = fieldChecker(tempValue);

    if(result) {
      attribute.insertAttribute({ id: Math.random(), category });
      toast('Add category');
      renderCategory();
    }
  });

}

function renderCategory() {
  const container = document.querySelector('.category-container');
  let containerHTML = '';
  attribute.attribute.forEach((value) => {
    containerHTML += `

      <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${value.id}</td>
      <td class="border-b border-gray-300 px-4 py-2">${value.category}</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-delete-category cursor-pointer" data-category-id=${value.id}>
          Delete
        </button>
      </td>
    </tr>
    
    `;
  });

  container.innerHTML = containerHTML;
  deleteCategory();
}

renderCategory();

function deleteCategory() {
  const deleteElems = document.querySelectorAll('.js-delete-category');
  let result;
  deleteElems.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const categoryId = deleteButton.dataset.categoryId;
      deleteDialog();
      const deleteElem = document.querySelector('.js-delete-product');
      deleteElem.addEventListener('click', () => {
        result = attribute.deleteAttribute(categoryId);
        if(result){
          toast('Delete category ');
          renderCategory();
        }
      });
    });
  });
}