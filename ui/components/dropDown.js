import { BaseComponent } from './baseComponent.js';

export class DropDown extends BaseComponent {
  /**
   * Создает экземпляр выпадающего списка.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор списка.
   * @param {string} name - Имя списка.
   */
  constructor(page, locator, name) {
    super(page, locator, name);
    this.type = 'Дропдаун';
  }
}
