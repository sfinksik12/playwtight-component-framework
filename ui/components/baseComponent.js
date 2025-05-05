import { expect } from '@playwright/test';
import { Allure } from '../../lib/allureReport.js';
import { Helpers } from '../../lib/helpers.js';

export class BaseComponent {
  /**
   * Создает экземпляр BaseComponent.
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright.
   * @param {string} rootLocator - Корневой локатор компонента.
   * @param {string} name - Имя компонента (для логов).
   */
  constructor(page, rootLocator, name) {
    this.page = page;
    this.rootLocator = rootLocator;
    this.name = name;
    this.type = 'component';
    this.allure = new Allure();
    this.helpers = new Helpers();
  }

  /**
   * Возвращает локатор Playwright для корневого элемента компонента.
   * @returns {import('@playwright/test').Locator}
   */
  get getLocator() {
    return this.page.locator(this.rootLocator);
  }

  /**
   * Возвращает тип компонента с заглавной буквы.
   * @returns {Promise<string>}
   */
  async upperType() {
    return this.helpers.capitalizeFirstLetter(this.type);
  }

  /**
   * Возвращает имя компонента с заглавной буквы.
   * @returns {Promise<string>}
   */
  async upperName() {
    return this.helpers.capitalizeFirstLetter(this.name);
  }

  /**
   * Получает Playwright локатор для текущего компонента (устаревший? Используйте getter `locator`).
   * @returns {Promise<import('@playwright/test').Locator>}
   * @deprecated Возможно, стоит использовать getter `locator` напрямую.
   */
  async getLocator() {
    // TODO: Проверить, нужен ли этот метод, т.к. есть getter `locator`.
    // Если локатор передается как аргумент, логика неясна.
    return this.page.locator(await this.locator); // Вызов getter `locator` здесь?
  }

  /**
   * Получает все элементы, соответствующие локатору компонента.
   * @returns {Promise<import('@playwright/test').Locator[]>}
   */
  async getAll() {
    return await this.allure.allure.step(`Получение всех локаторов из "${await this.upperName()}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator); // Использует getLocator
      return await locator.all();
    });
  }

  /**
   * Получает внутренний текст компонента (innerText).
   * @returns {Promise<string>}
   */
  async getInnerText() {
    return await this.allure.allure.step(`Получение внутреннего текста из "${await this.upperName()}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator); // Использует getLocator
      return await locator.innerText();
    });
  }

  /**
   * Получает введенный текст из поля ввода (inputValue).
   * @returns {Promise<string>}
   */
  async getInputText() {
    return await this.allure.allure.step(`Получение введенного текста из "${await this.upperName()}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator); // Использует getLocator
      return await locator.inputValue();
    });
  }

  /**
   * Кликает по компоненту.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {object} [options] - Опции для клика Playwright.
   * @returns {Promise<void>}
   */
  async click(message, options) {
    const msg = message || `Клик по "${this.name}" (${this.type})`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.click();
    });
  }

  /**
   * Наводит курсор на компонент.
   * @returns {Promise<void>}
   */
  async hover() {
    await this.allure.allure.step(`Наведение курсора на "${await this.upperName()}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator); // Использует getLocator
      await locator.hover();
    });
  }

  /**
   * Нажимает клавишу Enter на компоненте.
   * @returns {Promise<void>}
   */
  async pressEnter() {
    await this.allure.allure.step(`Нажатие Enter на "${await this.upperName()}" (${this.type})`, async () => {
      const locator = await this.getLocator(this.locator); // Использует getLocator
      await locator.press('Enter');
    });
  }

  /**
   * Проверяет видимость компонента.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {boolean} [isVisible=true] - Ожидаемое состояние видимости (true - видимый, false - невидимый).
   * @returns {Promise<void>}
   */
  async shouldBeVisible(message, isVisible = true) {
    const msg = message || `Проверка видимости "${this.name}" (${this.type})`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await expect(locator, { message: `${this.type} "${this.name}" is not visible` }).toBeVisible();
    });
  }

  /**
   * Проверяет НЕвидимость компонента.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @returns {Promise<void>}
   */
  async shouldBeHidden(message) {
    const msg = message || `Проверка, что "${this.name}" (${this.type}) не виден`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await expect(locator, { message: `${this.type} "${this.name}" is visible` }).toBeHidden();
    });
  }

  /**
   * Проверяет, что компонент активен (enabled).
   * @returns {Promise<void>}
   */
  async shouldBeEnabled() {
    await this.allure.allure.step(`Проверка, что "${await this.upperName()}" (${this.type}) активен`, async () => {
      const locator = await this.getLocator(this.locator); // Использует getLocator
      await expect(locator, { message: `${await this.upperType()} "${await this.upperName()} is not enabled` }).toBeEnabled();
    });
  }

  /**
   * Проверяет, что компонент неактивен (disabled).
   * @returns {Promise<void>}
   */
  async shouldBeDisabled() {
    await this.allure.allure.step(`Проверка, что "${await this.upperName()}" (${this.type}) неактивен`, async () => {
      const locator = await this.getLocator(this.locator); // Использует getLocator
      await expect(locator, { message: `${await this.upperType()} "${await this.upperName()} is not disabled` }).toBeDisabled();
    });
  }

  /**
   * Заполняет компонент текстом (обычно для input).
   * @param {string} value - Вводимое значение.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {object} [options] - Опции для fill Playwright.
   * @returns {Promise<void>}
   */
  async fill(value, message, options) {
    const msg = message || `Заполнение "${this.name}" (${this.type}) значением "${value}"`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.fill(value);
    });
  }

  /**
   * Очищает поле ввода.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {object} [options] - Опции для clear Playwright.
   * @returns {Promise<void>}
   */
  async clear(message, options) {
    const msg = message || `Очистка поля "${this.name}" (${this.type})`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.clear();
    });
  }

  /**
   * Выбирает опцию в select компоненте.
   * @param {string|object} value - Значение или опции для выбора.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {object} [options] - Опции для selectOption Playwright.
   * @returns {Promise<void>}
   */
  async selectOption(value, message, options) {
    const msg = message || `Выбор опции "${value}" в "${this.name}" (${this.type})`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await locator.selectOption(value);
    });
  }

  /**
   * Получает текстовое содержимое компонента.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {object} [options] - Опции для textContent Playwright.
   * @returns {Promise<string|null>}
   */
  async getText(message, options) {
    const msg = message || `Получение текста из "${this.name}" (${this.type})`;
    return await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      return await locator.textContent();
    });
  }

  /**
   * Получает значение атрибута компонента.
   * @param {string} attributeName - Имя атрибута.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @param {object} [options] - Опции для getAttribute Playwright.
   * @returns {Promise<string|null>}
   */
  async getAttribute(attributeName, message, options) {
    const msg = message || `Получение атрибута "${attributeName}" из "${this.name}" (${this.type})`;
    return await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      return await locator.getAttribute(attributeName);
    });
  }

  /**
   * Проверяет наличие текста в компоненте.
   * @param {string|RegExp} text - Ожидаемый текст или RegExp.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @returns {Promise<void>}
   */
  async shouldHaveText(text, message) {
    const msg = message || `Проверка текста "${text}" в "${this.name}" (${this.type})`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await expect(locator, { message: `${this.type} "${this.name}" does not contain text "${text}"` }).toHaveText(text);
    });
  }

  /**
   * Проверяет значение атрибута компонента.
   * @param {string} attributeName - Имя атрибута.
   * @param {string|RegExp} value - Ожидаемое значение или RegExp.
   * @param {string} [message] - Сообщение для шага Allure (по умолчанию генерируется).
   * @returns {Promise<void>}
   */
  async shouldHaveAttribute(attributeName, value, message) {
    const msg = message || `Проверка атрибута "${attributeName}" со значением "${value}" в "${this.name}" (${this.type})`;
    await this.allure.allure.step(msg, async () => {
      const locator = await this.getLocator(this.locator);
      await expect(locator, { message: `${this.type} "${this.name}" attribute "${attributeName}" does not have value "${value}"` }).toHaveAttribute(attributeName, value);
    });
  }
}
