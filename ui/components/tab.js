import { allure } from 'allure-playwright';
import { BaseComponent } from './baseComponent.js';

export class Tab extends BaseComponent {
  /**
   * Создает экземпляр вкладки (tab).
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор вкладки.
   * @param {string} name - Имя вкладки.
   */
  constructor(page, locator, name) {
    super(page);

    this.locator = locator;
    this.name = name;
    this.type = 'tab';
  }
}
