import { Types } from "../../../data/Types";
import { fieldChecker } from "../../shared/fieldcheck";
import { renderModalAttributes, toast } from "../shared/admin-modal";

const openDialogElem = document.querySelector('.js-add-type');

const TITLE = 'Types';
const types = new Types(TITLE);

openDialogElem.addEventListener('click', () => {
  renderModalAttributes(TITLE);
  const addTypeElem = document.querySelector(`.js-add-new-${TITLE}`);
  addTypeElem.addEventListener('click', () => {
    const typeName = document.querySelector(`.js-attribute-${TITLE}`).value;
    const tempValue = [typeName];
    const result = fieldChecker(tempValue);
    if(result) {
      types.insertType({
        id: Math.random(),
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
    containerHTML += `
      <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${type.id}</td>
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
