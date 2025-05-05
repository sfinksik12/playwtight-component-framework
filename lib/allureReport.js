import { allure } from 'allure-playwright';

export class Allure {
  /**
   * Создает экземпляр обертки Allure.
   */
  constructor() {
    this.allure = allure;
  }

  /**
   * Общий метод для прикрепления данных к отчету Allure.
   * @param {string} title - Заголовок аттача.
   * @param {*} data - Данные для прикрепления.
   * @private
   */
  async attachData(title, data) {
    const formattedData = this.formatDataAsJson(data);
    await this.allure.attachment(title, formattedData, 'application/json');
  }

  /**
   * Форматирует данные в JSON-строку.
   * @param {*} data - Данные для форматирования.
   * @returns {string} JSON-строка или исходные данные.
   * @private
   */
  formatDataAsJson(data) {
    const isJsonObject = typeof data === 'object' && data !== null;
    return isJsonObject ? JSON.stringify(data, null, 2) : data || '';
  }

  /**
   * Прикрепляет тело запроса к отчету.
   * @param {*} data - Тело запроса.
   */
  async attachRequestData(data) {
    await this.attachData('REQUEST DATA', data);
  }

  /**
   * Прикрепляет заголовки запроса к отчету.
   * @param {object} headers - Заголовки запроса.
   */
  async attachRequestHeaders(headers) {
    await this.attachData('REQUEST HEADERS', headers);
  }

  /**
   * Прикрепляет тело ответа к отчету.
   * @param {*} data - Тело ответа.
   */
  async attachResponseData(data) {
    await this.attachData('RESPONSE DATA', data);
  }

  /**
   * Прикрепляет заголовки ответа к отчету.
   * @param {object} headers - Заголовки ответа.
   */
  async attachResponseHeaders(headers) {
    await this.attachData('RESPONSE HEADERS', headers);
  }

  /**
   * Прикрепляет ошибки валидации схемы к отчету.
   * @param {*} data - Данные об ошибках.
   */
  async attachValidationErrorData(data) {
    await this.attachData('VALIDATION ERROR', data);
  }

  /**
   * Логирует статус-код ответа в шаг Allure.
   * @param {number|string} code - Статус-код.
   */
  async attachStatusCode(code) {
    await this.allure.logStep(`Статус код: ${code}`);
  }
}
