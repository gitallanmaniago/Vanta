import { Attributes } from "../../../data/Attributes.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { renderModalAttributes, toast } from "../shared/admin-modal.js";

const attribute = new Attributes();

const openCatElem = document.querySelector('.js-add-category');

openCatElem.addEventListener('click', () => {
  renderModalAttributes('Category');
  addAttribute('Category');
});

function addAttribute(title) {
  const attriButtonElem = document.querySelector(`.js-add-new-${title}`);

  attriButtonElem.addEventListener('click', () => {
    const inputValue = document.querySelector(`.js-attribute-${title}`).value;
    const tempValue = [inputValue];
    const result = fieldChecker(tempValue);

    if(result) {
      attribute.insertAttribute(title, [{
        id: Math.random(),
        inputValue
      }]);

      toast('Add category');
    }
  });

}