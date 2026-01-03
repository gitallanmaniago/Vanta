import { Products } from "../../../data/products.js";
import { renderModalProduct, toast } from "../shared/admin-modal.js";

const products = new Products('Products');

function renderProducts() {
  const container = document.querySelector('.products-container');
  let containerHTML = '';

 products.products.forEach((items) => {
  containerHTML += 
  `
    <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${items.name}</td>
      <td class="border-b border-gray-300 px-4 py-2">Maria Anders</td>
      <td class="border-b border-gray-300 px-4 py-2">${items.description}</td>
      <td class="border-b border-gray-300 px-4 py-2">Germany</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-view-button block cursor-pointer">
          View
        </button>
        <button class="cursor-pointer">
          Delete
        </button>
      </td>
    </tr>
  `
 });

 container.innerHTML = containerHTML;
}

renderProducts();

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
    renderProducts();
  }
}

function fieldChecker(data) {
  let result = 0;
  data.forEach((field, index) => {
    const errorElem = document.querySelector(`.js-field-${index}`);
    if(field.trim() === '') {
      result++;
      errorElem.classList.remove('hidden');
    } else
      errorElem.classList.add('hidden');

  });
  
  return result === 0 ? true : false;
}






