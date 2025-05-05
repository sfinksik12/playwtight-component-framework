import { BaseComponent } from './baseComponent.js';

export class Form extends BaseComponent {
  /**
   * Создает экземпляр формы.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор формы.
   * @param {string} name - Имя формы.
   */
  constructor(page, locator, name) {
    super(page, locator, name);
    this.type = 'Форма';
  }
}
