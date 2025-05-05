import { BaseComponent } from './baseComponent.js';

export class TimePicker extends BaseComponent {
  /**
   * Создает экземпляр выбора времени.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор компонента.
   * @param {string} name - Имя компонента.
   */
  constructor(page, locator, name) {
    super(page, locator, name);
    this.type = 'Выбор времени';
  }
}
