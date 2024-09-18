export class Utils {
  static getBEMModificator(className, modificator) {
    return `${className}--${modificator}`;
  }

  static getBEMElement(className, element) {
    return `${className}__${element}`;
  }
}
