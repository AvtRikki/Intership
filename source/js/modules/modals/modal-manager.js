import { Utils } from '../utils.js';
import {CustomSelect} from '../selectors/custom-select.js';
import {MaskManager} from '../form/mask-manager.js';

export class ModalManager {
  #MODAL_OPENED_PART = 'show';
  #MODAL_CLOSR_PART = 'close';

  constructor(modalClassName, showModalTriggerClass) {
    this.modalClassName = modalClassName;
    this.showModalTriggerClass = showModalTriggerClass;

    this.modal = document.querySelector(`.${this.modalClassName}`);
    this.form = this.modal?.querySelector('form');
    this.showModalClass = Utils.getBEMModificator(this.modalClassName, this.#MODAL_OPENED_PART);
    this.closeModalClass = Utils.getBEMElement(this.modalClassName, this.#MODAL_CLOSR_PART);

    this.customSelect = new CustomSelect(`${modalClassName} .custom-select`);

    const maskManager = new MaskManager('form__content--light .form__input--phone');
    maskManager.initialize();
  }

  initialize() {
    if (this.modal) {
      const showTriggerButton = document.querySelector(`.${this.showModalTriggerClass}`);
      showTriggerButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.modal.classList.add(this.showModalClass);
      });

      const closeTriggerButton = document.querySelector(`.${this.closeModalClass}`);
      closeTriggerButton.addEventListener('click', () => {
        this.form?.reset();
        this.customSelect?.closeAllSelect(null);
        this.modal.classList.remove(this.showModalClass);
      });
    }
  }
}
