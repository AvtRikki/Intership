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

    for (let j = 0; j < element.length; j++) {
      const optionDiv = document.createElement('div');
      const content = document.createElement('p');
      content.textContent = element.options[j].innerText;
      optionDiv.appendChild(content);
      optionDiv.addEventListener('click', () => {
        this.selectOption(element, optionDiv);
      });
      itemsDiv.appendChild(optionDiv);
    }

    return itemsDiv;
  }

  selectOption(selElement, optionDiv) {
    const selectedText = optionDiv.querySelector('p').innerHTML;
    const selectedDiv = optionDiv.parentNode.previousSibling;

    for (let i = 0; i < selElement.length; i++) {
      if (selElement.options[i].innerHTML === selectedText) {
        selElement.selectedIndex = i;
        selectedDiv.innerHTML = selectedText;

        const allOptions = optionDiv.parentNode.getElementsByClassName('custom-select--same-as-selected');
        for (let k = 0; k < allOptions.length; k++) {
          allOptions[k].classList.remove('custom-select--same-as-selected');
        }

        optionDiv.setAttribute('class', 'custom-select--same-as-selected');
        break;
      }
    }

    selectedDiv?.click();
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
