import {Utils} from '../utils.js';

export class AccordionMananger {
  #EXPANDED_SECTION_MODIFICATOR = 'expanded';

  constructor(accordionElementClassName) {
    this.accordionElement = document.querySelector(`.${accordionElementClassName}`);
  }

  initalize(accordionItemClassName) {
    const accordionItems = this.accordionElement.querySelectorAll(`.${accordionItemClassName}`);
    const expandedClassName = Utils.getBEMModificator(accordionItemClassName, this.#EXPANDED_SECTION_MODIFICATOR);
    accordionItems.forEach((accordionItem) => {
      accordionItem.addEventListener('click', (evt) => {
        if (!Utils.isParagraph(evt.target)) {
          accordionItem.classList.toggle(expandedClassName);
          evt.preventDefault();
        }
      });
    });
  }
}
