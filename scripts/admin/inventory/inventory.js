import { Inventory } from "../../../data/Inventory.js";
import { renderInventoryDialog } from "../shared/admin-modal.js";

const inventory = new Inventory('Inventory'); 
const renderDialog = document.querySelector('.js-add-item');

renderDialog.addEventListener('click', () => renderInventoryDialog());