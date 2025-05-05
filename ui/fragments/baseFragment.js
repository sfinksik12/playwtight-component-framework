import { expect } from '@playwright/test';
import { Allure } from '../../lib/allureReport.js';
import { Helpers } from '../../lib/helpers.js';
import { BaseComponent } from '../components/baseComponent.js';

export class BaseFragment extends BaseComponent {
  /**
   * Создает экземпляр BaseFragment.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} name - Имя фрагмента (для логов).
   */
  constructor(page, name) {
    super(page, name);
    this.type = 'fragment';
    this.allure = new Allure();
    this.helpers = new Helpers();
  }
  // Сюда можно добавлять общие методы для всех фрагментов, если потребуется
}
