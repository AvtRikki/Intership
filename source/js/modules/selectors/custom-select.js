export class CustomSelect {
  constructor(selectClassName) {
    this.selectElement = document.querySelector(`.${selectClassName}`);
    this.initialize();
  }

  initialize() {
    const select = this.selectElement.getElementsByTagName('select')[0];
    const selectedDiv = this.createSelectedElement(select);
    const optionsDiv = this.createOptionsList(select);

    this.selectElement.appendChild(selectedDiv);
    this.selectElement.appendChild(optionsDiv);

    this.selectOption(select, this.selectElement.querySelector('[data-empty-option="true"]'));
    selectedDiv.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.closeAllSelect(selectedDiv);
      optionsDiv.classList.toggle('custom-select--hide');
      selectedDiv.classList.toggle('custom-select__arrow--active');
    });

    document.addEventListener('click', () => this.closeAllSelect(null));
  }

  createSelectedElement(element) {
    const selectedDiv = document.createElement('div');
    selectedDiv.setAttribute('class', 'custom-select--selected');
    const content = document.createElement('p');
    content.textContent = element.options[element.selectedIndex].innerText;
    selectedDiv.appendChild(content);

    return selectedDiv;
  }

  createOptionsList(element) {
    const itemsDiv = document.createElement('div');
    itemsDiv.setAttribute('class', 'custom-select__items custom-select--hide');
    const emptyOptionDiv = this.createOption(element, '');
    itemsDiv.appendChild(emptyOptionDiv);
    emptyOptionDiv.setAttribute('data-empty-option', 'true');
    for (let j = 0; j < element.length; j++) {
      const optionDiv = this.createOption(element, element.options[j].innerText);
      itemsDiv.appendChild(optionDiv);
    }

    return itemsDiv;
  }

  createOption(element, textContent) {
    const optionDiv = document.createElement('div');
    const content = document.createElement('p');
    content.textContent = textContent;
    optionDiv.appendChild(content);
    optionDiv.addEventListener('click', () => {
      this.selectOption(element, optionDiv);
    });

    return optionDiv;
  }

  selectOption(selElement, optionDiv) {
    const selectedText = optionDiv.querySelector('p').innerHTML;
    const selectedDiv = optionDiv.parentNode.previousSibling;

    if (selectedText === '') {
      this.setElementSelected(selElement, -1, selectedDiv, selectedText, optionDiv);
    }

    for (let i = 0; i < selElement.length; i++) {
      if (selElement.options[i].innerHTML === selectedText) {
        this.setElementSelected(selElement, i, selectedDiv, selectedText, optionDiv);
        break;
      }
    }

    selectedDiv?.click();
  }

  setElementSelected(selElement, i, selectedDiv, selectedText, optionDiv) {
    selElement.selectedIndex = i;
    selectedDiv.innerHTML = selectedText;

    const allOptions = optionDiv.parentNode.getElementsByClassName('custom-select--same-as-selected');
    for (let k = 0; k < allOptions.length; k++) {
      allOptions[k].classList.remove('custom-select--same-as-selected');
    }

    optionDiv.setAttribute('class', 'custom-select--same-as-selected');
  }

  closeAllSelect(element) {
    const selected = document.getElementsByClassName('custom-select--selected');

    for (let i = 0; i < selected.length; i++) {
      if (element !== selected[i]) {
        selected[i].classList.remove('custom-select__arrow--active');
      }
    }
  }
}
