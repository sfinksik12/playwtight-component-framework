import { BaseComponent } from './baseComponent.js';

export class Calendar extends BaseComponent {
  /**
   * Создает экземпляр календаря.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор календаря.
   * @param {string} name - Имя календаря.
   */
  constructor(page, locator, name) {
    super(page, locator, name);
    this.type = 'Календарь';
  }
}
