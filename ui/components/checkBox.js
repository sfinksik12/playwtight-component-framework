import { BaseComponent } from './baseComponent.js';

export class CheckBox extends BaseComponent {
  /**
   * Создает экземпляр чекбокса.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор чекбокса.
   * @param {string} name - Имя чекбокса.
   */
  constructor(page, locator, name) {
    super(page, locator, name);
    this.type = 'Чекбокс';
  }
}
