import { Types } from "../../../data/Types";
import { fieldChecker } from "../../shared/fieldcheck";
import { renderModalAttributes, toast } from "../shared/admin-modal";

const openDialogElem = document.querySelector('.js-add-type');

const TITLE = 'Types';
const types = new Types(TITLE);

openDialogElem.addEventListener('click', () => {
  renderModalAttributes(TITLE);
  const addTypeElem = document.querySelector(`js-add-new-${TITLE}`);
  addTypeElem.addEventListener('click', () => {
    const typeName = document.querySelector(`js-attribute-${TITLE}`).value;
    const tempValue = [typeName];
    const result = fieldChecker(tempValue);
    if(result) {
      types.insertType({
        id: Math.random(),
        typeName
      });
      toast('Type added');
    }
  });
});

function renderType(data) {

}
