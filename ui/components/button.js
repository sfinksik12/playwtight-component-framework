import { allure } from 'allure-playwright';
import { BaseComponent } from './baseComponent.js';

export class Button extends BaseComponent {
  /**
   * Создает экземпляр кнопки.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор кнопки.
   * @param {string} name - Имя кнопки.
   */
  constructor(page, locator, name) {
    super(page);

    this.locator = locator;
    this.name = name;
    this.type = 'Кнопка';
  }
}
