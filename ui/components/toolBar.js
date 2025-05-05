import { allure } from 'allure-playwright';
import { BaseComponent } from './baseComponent.js';

export class ToolBar extends BaseComponent {
  /**
   * Создает экземпляр панели инструментов.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор панели.
   * @param {string} name - Имя панели.
   */
  constructor(page, locator, name) {
    super(page);

    this.locator = locator;
    this.name = name;
    this.type = 'Тулбар';
  }
}
