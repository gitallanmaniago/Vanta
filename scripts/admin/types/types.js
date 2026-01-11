import { Subcategory } from "../../../data/Subcategory";
import { Types } from "../../../data/Types";
import { fieldChecker } from "../../shared/fieldcheck";
import { deleteDialog, renderModalAttributes, toast, renderTypeDialog } from "../shared/admin-modal";

const openDialogElem = document.querySelector('.js-add-type');
const subcategory = new Subcategory('Subcategory');
const TITLE = 'Type';
const types = new Types(TITLE);

openDialogElem.addEventListener('click', () => {
  renderTypeDialog(TITLE);
  const addTypeElem = document.querySelector(`.js-add-type-value`);
  addTypeElem.addEventListener('click', () => {
    const dropdownValue = getSelectedValues();
    const typeName = document.querySelector(`.js-attribute-value`).value;
    const tempValue = [typeName];
    const result = fieldChecker(tempValue, dropdownValue);
    if(result) {
      types.insertType({
        id: Math.random(),
        subcategoryId: dropdownValue,
        typeName
      });
      toast('Type added');
      renderType(types.searchType(''));

    }
  });
});

function renderType(data) {
  const container = document.querySelector('.type-container');
  let containerHTML = '';

  data.forEach((type) => {
    console.log(type);
    containerHTML += `
      <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${type.id}</td>
      <td class="border-b border-gray-300 px-4 py-2">${subcategory.getMatchingSubcategory(type.subcategoryId)?.attributeValue || ''}</td>
      <td class="border-b border-gray-300 px-4 py-2">${type.typeName}</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-delete-type cursor-pointer" data-type-id=${type.id}>
          Delete
        </button>
      </td>
    </tr>
    `
  });
  container.innerHTML = containerHTML;
  deleteType();
}

renderType(types.searchType(''));
searchType();

function searchType() {
  const searchElem = document.querySelector('.js-search-type');
  searchElem.addEventListener('input', () => {
    const searchWord = searchElem.value.trim();
    renderType(types.searchType(searchWord));
  });
}

function deleteType() {
  const openDeleteDialogElem = document.querySelectorAll('.js-delete-type');
  
  openDeleteDialogElem.forEach((deleteType) => {
    deleteType.addEventListener('click', () => {
      const typeId = deleteType.dataset.typeId;
      deleteDialog();
      const deleteElem = document.querySelector('.js-delete-product');

      deleteElem.addEventListener('click', () => {
        const result = types.deleteType(typeId);
        if(result){
          toast('Type deleted ');
          renderType(types.searchType(''));
        }
      });
    });
  });
}


function getSelectedValues() {
  const attributeSelectElem = document.querySelector('.js-attribute-name');
  return attributeSelectElem.value;
}