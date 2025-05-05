import { allure } from 'allure-playwright';
import { BaseComponent } from './baseComponent.js';

export class Text extends BaseComponent {
  /**
   * Создает экземпляр текстового элемента.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор текстового элемента.
   * @param {string} name - Имя текстового элемента.
   */
  constructor(page, locator, name) {
    super(page);

    this.locator = locator;
    this.name = name;
    this.type = 'Текст';
  }
}
