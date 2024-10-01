export class Utils {
  static getBEMModificator(className, modificator) {
    return `${className}--${modificator}`;
  }

  static getBEMElement(className, element) {
    return `${className}__${element}`;
  }

  static isParagraph(element) {
    return element.nodeName.toLowerCase() === 'p';
  }
}
