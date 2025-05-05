import { BaseComponent } from './baseComponent.js';

export class Container extends BaseComponent {
  /**
   * Создает экземпляр контейнера.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор контейнера.
   * @param {string} name - Имя контейнера.
   */
  constructor(page, locator, name) {
    super(page, locator, name);
    this.type = 'Контейнер';
  }
}
