import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BaseComponent } from './baseComponent.js';
import { Allure } from '../../lib/allureReport.js';

const allure = new Allure();

export class Input extends BaseComponent {
  /**
   * Создает экземпляр поля ввода.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} locator - Локатор поля ввода.
   * @param {string} name - Имя поля ввода.
   */
  constructor(page, locator, name) {
    super(page);

    this.locator = locator;
    this.name = name;
    this.type = 'input';
  }

  /**
   * Заполняет поле ввода текстом и проверяет значение.
   * @param {string} text - Текст для ввода.
   * @returns {Promise<void>}
   */
  async fillText(text) {
    await allure.step(`Ввод значения "${text}" в "${this.name}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.fill(text);
      await expect(locator).toHaveValue(text);
    });
  }

  /**
   * Вводит текст в поле посимвольно (с задержкой) и проверяет значение.
   * @param {string} text - Текст для ввода.
   * @returns {Promise<void>}
   */
  async typeText(text) {
    await allure.step(`Посимвольный ввод "${text}" в "${this.name}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.type(text, { delay: 100 });
      await expect(locator).toHaveValue(text);
    });
  }

  /**
   * Очищает поле ввода.
   * @returns {Promise<void>}
   */
  async clearTextInput() {
    await allure.step(`Очистка поля "${this.name}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.clear();
    });
  }

  /**
   * Нажимает Enter в поле ввода.
   * @returns {Promise<void>}
   */
  async pressEnter() {
    await allure.step(`Нажатие Enter в поле "${this.name}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.press('Enter');
    });
  }

  /**
   * Получает значение (value) поля ввода.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @returns {Promise<string>}
   */
  async getValue(message) {
    const msg = message || `Получение значения из "${this.name}" (${this.type})`;
    return await allure.allure.step(msg, async () => {
      return await this.locator.inputValue();
    });
  }

  /**
   * Вводит текст в поле ввода посимвольно (имитация набора).
   * @param {string} value - Текст для ввода.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {object} [options] - Опции для pressSequentially Playwright.
   * @returns {Promise<void>}
   */
  async type(value, message, options) {
    const msg = message || `Посимвольный ввод (pressSequentially) "${value}" в "${this.name}" (${this.type})`;
    await allure.allure.step(msg, async () => {
      await this.locator.pressSequentially(value, options);
    });
  }
}
