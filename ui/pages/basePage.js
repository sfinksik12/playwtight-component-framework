import { expect } from '@playwright/test';
import { Allure } from '../../lib/allureReport.js';
import { Helpers } from '../../lib/helpers.js';
import { ExcelHandler } from '../../lib/excel.js';
import { BaseMapping } from '../../lib/mapping.js';

export class BasePage {
  /**
   * Создает экземпляр BasePage.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} path - Путь к странице.
   */
  constructor(page, path) {
    this.page = page;
    this.path = path;
    this.allure = new Allure();
    this.helpers = new Helpers();
    this.excel = new ExcelHandler();
    this.mapping = new BaseMapping();
  }

  /**
   * Открывает страницу по указанному эндпоинту.
   * @param {string} endpoint - Эндпоинт или полный URL страницы.
   * @returns {Promise<void>}
   */
  async openPage(endpoint) {
    await this.allure.allure.step(`Открытие страницы: "${endpoint}"`, async () => {
      await this.page.goto(endpoint);
    });
  }

  /**
   * Получает текущий URL страницы.
   * @returns {Promise<string>}
   */
  async getPageUrl() {
    return await this.allure.allure.step(`Получение URL текущей страницы`, async () => {
      return await this.page.url();
    });
  }

  /**
   * Перезагружает текущую страницу.
   * @returns {Promise<void>}
   */
  async reloadPage() {
    let currentUrl = this.page.url();
    await this.allure.allure.step(`Перезагрузка страницы с URL: ${currentUrl}`, async () => {
      await this.page.reload();
    });
  }

  /**
   * Проверяет, что текущий URL содержит указанную часть.
   * @param {string} partialUrl - Часть URL для проверки.
   * @returns {Promise<void>}
   */
  async checkPageUrlContains(partialUrl) {
    await this.allure.allure.step(`Проверка, что URL страницы содержит: ${partialUrl}`, async () => {
      expect(this.page.url()).toContain(partialUrl);
    });
  }

  /**
   * Проверяет, что текущий URL точно совпадает с указанным.
   * @param {string} url - Ожидаемый URL.
   * @returns {Promise<void>}
   */
  async checkPageUrl(url) {
    await this.allure.allure.step(`Проверка, что URL страницы равен: ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

  /**
   * Ожидает, пока URL страницы не станет равным указанному.
   * @param {string} url - Ожидаемый URL.
   * @returns {Promise<void>}
   */
  async waitForUrl(url) {
    await this.allure.allure.step(`Ожидание URL страницы: ${url}`, async () => {
      await this.page.waitForURL(url);
    });
  }

  /**
   * Ожидает ответ от указанного эндпоинта со статусом 200.
   * @param {string} endpoint - Часть URL эндпоинта.
   * @returns {Promise<import('@playwright/test').Response>}
   */
  async waitForResponse(endpoint) {
    return this.allure.allure.step(`Ожидание ответа от эндпоинта: "${endpoint}"`, async () => {
      return this.page.waitForResponse(res => res.url().includes(endpoint) && res.status() === 200);
    });
  }

  /**
   * Получает cookie по имени.
   * @param {string} name - Имя cookie.
   * @returns {Promise<object|undefined>} Найденный объект cookie или undefined.
   */
  async getCookieByName(name) {
    return await this.allure.allure.step(`Получение cookie по имени: ${name}`, async () => {
      let cookies = await this.page.context().cookies();
      return cookies.find(function (cookie) {
        return cookie.name === name;
      });
    });
  }

  /**
   * Устанавливает cookie.
   * @param {object|Array<object>} cookie - Объект cookie или массив объектов cookie для установки.
   * @returns {Promise<void>}
   */
  async setCookie(cookie) {
    await this.allure.allure.step(`Установка cookie: ${JSON.stringify(cookie)}`, async () => {
      await this.page.context().addCookies(cookie);
    });
  }

  /**
   * Ожидает загрузки страницы.
   * @param {string} [expectedUrl=this.path] - Ожидаемый URL или его часть (по умолчанию - путь страницы).
   * @param {string} [message='Страница загрузилась'] - Сообщение для шага Allure.
   * @param {number} [timeout=15000] - Таймаут ожидания в мс.
   * @returns {Promise<void>}
   */
  async waitLoad(expectedUrl = this.path, message = 'Страница загрузилась', timeout = 15000) {
    await allureReport.allure.step(message || `Ожидание загрузки страницы по URL: ${expectedUrl}`, async () => {
      await this.page.waitForURL(`**${expectedUrl}`, { timeout: timeout });
      await allureReport.attach(`URL: ${await this.page.url()}`, 'text/plain');
    });
  }

  /**
   * Открывает страницу по указанному URL.
   * @param {string} [url=this.path] - URL для открытия (по умолчанию - путь страницы).
   * @param {string} [message='Открываем страницу'] - Сообщение для шага Allure.
   * @param {number} [timeout=15000] - Таймаут ожидания в мс.
   * @returns {Promise<void>}
   */
  async open(url = this.path, message = 'Открываем страницу', timeout = 15000) {
    await allureReport.allure.step(message || `Открытие страницы: ${url}`, async () => {
      await this.page.goto(url, { timeout: timeout });
      await allureReport.attach(`URL: ${await this.page.url()}`, 'text/plain');
    });
  }

  /**
   * Перезагружает текущую страницу.
   * @param {string} [message='Перезагружаем страницу'] - Сообщение для шага Allure.
   * @param {number} [timeout=15000] - Таймаут ожидания в мс.
   * @returns {Promise<void>}
   */
  async reload(message = 'Перезагружаем страницу', timeout = 15000) {
    await allureReport.allure.step(message || 'Перезагрузка страницы', async () => {
      await this.page.reload({ timeout: timeout });
      await allureReport.attach(`URL: ${await this.page.url()}`, 'text/plain');
    });
  }

  /**
   * Проверяет, что текущий URL содержит ожидаемую строку.
   * @param {string} [expectedUrl=this.path] - Ожидаемый URL или его часть (по умолчанию - путь страницы).
   * @param {string} [message='Проверяем адрес страницы'] - Сообщение для шага Allure.
   * @returns {Promise<void>}
   */
  async shouldHaveUrl(expectedUrl = this.path, message = 'Проверяем адрес страницы') {
    await allureReport.allure.step(message || `Проверка URL страницы (ожидается: ${expectedUrl})`, async () => {
      await expect(this.page).toHaveURL(`**${expectedUrl}`);
      await allureReport.attach(`Текущий URL: ${this.page.url()}`, 'text/plain');
    });
  }

  /**
   * Проверяет, что заголовок страницы содержит ожидаемый текст.
   * @param {string|RegExp} title - Ожидаемый текст или RegExp заголовка.
   * @param {string} [message='Проверяем заголовок страницы'] - Сообщение для шага Allure.
   * @returns {Promise<void>}
   */
  async shouldHaveTitle(title, message = 'Проверяем заголовок страницы') {
    await allureReport.allure.step(message || `Проверка заголовка страницы (ожидается: ${title})`, async () => {
      await expect(this.page).toHaveTitle(title);
      await allureReport.attach(`Текущий заголовок: ${await this.page.title()}`, 'text/plain');
    });
  }
}
