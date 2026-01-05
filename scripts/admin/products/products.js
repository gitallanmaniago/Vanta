import { Products } from "../../../data/products.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { deleteDialog, renderModalProduct, toast } from "../shared/admin-modal.js";

const products = new Products('Products');

function renderProducts(data) {
  const container = document.querySelector('.products-container');
  let containerHTML = '';
  products.loadFromLocalStorage();

  data.forEach((items) => {
  containerHTML += 
  `
    <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${items.name}</td>
      <td class="border-b border-gray-300 px-4 py-2">Maria Anders</td>
      <td class="border-b border-gray-300 px-4 py-2">${items.description}</td>
      <td class="border-b border-gray-300 px-4 py-2">Germany</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-view-button block cursor-pointer" data-product-id=${items.id}>
          View
        </button>
        <button class="js-delete-button cursor-pointer" data-product-id=${items.id}>
          Delete
        </button>
      </td>
    </tr>
  `
 });
 container.innerHTML = containerHTML;
 initActions();
}

renderProducts(products.searchProduct(''));
function initActions(){
  const viewElem = document.querySelectorAll('.js-view-button');
  viewElem.forEach((viewButton) => {
    viewButton.addEventListener('click', () => {
      const itemId = viewButton.dataset.productId;
    });
  });

  const deleteElem = document.querySelectorAll('.js-delete-button');
  deleteElem.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const itemId = deleteButton.dataset.productId;
      deleteDialog();
      deleteProduct(itemId);
    });
  });
}

const addProductElem = document.querySelector('.js-add-product');
addProductElem.addEventListener('click', () => {
  renderModalProduct();
  const addNewProduct = document.querySelector('.js-add-new-product');
    addNewProduct.addEventListener('click', () => {
      validateUserInput();
    });
});

function validateUserInput() {
  const name = document.querySelector('.js-product-name').value;
  const type = document.querySelector('.js-product-type').value;
  const category = document.querySelector('.js-product-category').value;
  const description = document.querySelector('.js-product-description').value;

  const tempValue = [name, type, category, description];
  const result = fieldChecker(tempValue);

  if(result) {
    products.insertProducts({
      id: Math.random(),
      name,
      type,
      category,
      description
    });
    toast('Add product');
    renderProducts(searchProduct(''));
  }
}

function deleteProduct(itemId) {
  const deleteElem = document.querySelector('.js-delete-product');
  deleteElem.addEventListener('click', () => {
    const result = products.deleteProduct(itemId);
    if(result) {
      toast('Deleted ');
      renderProducts(products.searchProduct(''));
    }
  });
}

searchProduct();

function searchProduct() {
  const searchElem = document.querySelector('.js-search-product');

  searchElem.addEventListener('input', () => {
    const value = searchElem.value.trim();
    if(value === '')
      renderProducts(products.searchProduct(''));
    else 
      renderProducts(products.searchProduct(value));
  });
}



