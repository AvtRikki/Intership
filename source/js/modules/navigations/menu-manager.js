import { Utils } from '../utils.js';

export class MenuManager {
  #MENU_OPENED_PART = 'show';
  #MENU_BUTTON_PART = 'button';
  #MENU_WRAPPER_PART = 'wrapper';
  #MENU_OVERLAY_PART = 'overlay';
  #MENU_LINKS_CONTAINER_PART = 'links-wrapper';
  #MENU_LINK_PART = 'data-scroll-to';

  constructor(className) {
    this.buttonClassName = Utils.getBEMElement(className, `menu-${this.#MENU_BUTTON_PART}`);
    this.menuClassName = Utils.getBEMElement(className, `menu-${this.#MENU_WRAPPER_PART}`);
    this.overlayClassName = Utils.getBEMElement(className, `menu-${this.#MENU_OVERLAY_PART}`);
    this.linksContainerClass = Utils.getBEMElement(className, `menu-${this.#MENU_LINKS_CONTAINER_PART}`);
    this.menuOpenClass = Utils.getBEMModificator(this.menuClassName, `menu-${this.#MENU_OPENED_PART}`);

    this.menu = document.querySelector(`.${this.menuClassName}`);
    this.button = document.querySelector(`.${this.buttonClassName}`);
    this.overlay = document.querySelector(`.${this.overlayClassName}`);
    this.linksContainer = document.querySelector(`.${this.linksContainerClass}`);
  }

  #handleKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.#hideMenu();
    }
  }

  #handleLinkSelected(event) {
    if (event.target.hasAttribute(this.#MENU_LINK_PART)) {
      const attribute = event.target.getAttribute(this.#MENU_LINK_PART);
      const targetSection = document.querySelector(attribute);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        this.#hideMenu();
      }
    }
  }

  #hideMenu() {
    this.menu.classList.remove(this.menuOpenClass);
    document.removeEventListener('keydown', this.#handleKeyDown);
    this.overlay.removeEventListener('click', this.#hideMenu);
    this.linksContainer.removeEventListener('click', this.#handleLinkSelected);
    document.body.style.overflow = '';
  }

  #showMenu() {
    this.menu.classList.add(this.menuOpenClass);
    document.addEventListener('keydown', this.#handleKeyDown.bind(this));
    this.overlay.addEventListener('click', this.#hideMenu.bind(this));
    this.linksContainer.addEventListener('click', this.#handleLinkSelected.bind(this));
    document.body.style.overflow = 'hidden';
  }

  initialize() {
    if (this.button) {
      this.button.addEventListener('click', () => this.menu.classList.contains(this.menuOpenClass) ? this.#hideMenu() : this.#showMenu());
    }
  }
}
