export class MaskManager {
  constructor(maskElementClass) {
    this.maskElementClass = maskElementClass;

    this.maskElement = document.querySelector(`.${this.maskElementClass}`);
  }

  initialize() {
    if (this.maskElement) {
      this.maskElement.addEventListener('focus', this.onPhoneInputFocus.bind(this));
      this.maskElement.addEventListener('input', this.onPhoneInputInput.bind(this));
      this.maskElement.addEventListener('blur', this.onPhoneInputBlur.bind(this));
      this.maskElement.addEventListener('keydown', this.onPhoneInputKeyDown.bind(this));
    }
  }

  onPhoneInputFocus(event) {
    const input = event.target;
    if (!input.value) {
      input.value = '+7 (';
      this.setCaretPosition(input, input.value.length);
    }
  }

  onPhoneInputInput(event) {
    const input = event.target;
    const inputNumbersValue = this.getInputNumbersValue(input);
    let formattedInputValue = '+7 (';

    if (!inputNumbersValue) {
      input.value = '';
      return;
    }

    if (inputNumbersValue.length > 1) {
      formattedInputValue += inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += `) ${ inputNumbersValue.substring(4, 7)}`;
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += `-${ inputNumbersValue.substring(7, 9)}`;
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += `-${ inputNumbersValue.substring(9, 11)}`;
    }

    input.value = formattedInputValue;
    this.setCaretPosition(input, input.value.length);
  }

  onPhoneInputKeyDown(event) {
    const input = event.target;

    if (event.key === 'Backspace' && this.getInputNumbersValue(input).length === 1) {
      input.value = '';
    }
  }

  onPhoneInputBlur(event) {
    const input = event.target;
    if (input.value === '+7 (') {
      input.value = '';
    }
  }

  getInputNumbersValue(input) {
    return input.value.replace(/\D/g, '');
  }

  setCaretPosition(input, position) {
    setTimeout(() => {
      input.setSelectionRange(position, position);
    }, 0);
  }
}
