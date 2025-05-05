import { SchemaValidator } from './schemaValidator.js';
import { request, expect } from '@playwright/test';
import { Allure } from '../lib/allureReport.js';
import { Helpers } from '../lib/helpers.js';
import dotenv from 'dotenv';

dotenv.config();

let allureReport = new Allure();

/**
 * API-клиент с отчетами Allure и валидацией схем.
 */
export class API {
  /**
   * Создает API-клиент.
   * @param {object} option - Опции конфигурации: url, path, method, headers, params, data, schema.
   */
  constructor(option) {
    this.request = request;
    this.option = option;
    this.allureReport = allureReport;
    this.schemaValidator = new SchemaValidator();
    this.helpers = new Helpers();
  }

  /**
   * Отправляет HTTP-запрос (Playwright).
   * @private
   */
  async sendRequest(options, method, url) {
    const context = await this.request.newContext();
    const response = await context[method.toLowerCase()](url.href, options);
    await this.allureReport.attachStatusCode(await response.status());
    await this.attachRequestDetailsToReport(options, response);
    await this.attachResponseDetailsToReport(response);
    return response;
  }

  /**
   * Добавляет детали запроса в Allure.
   * @private
   */
  async attachRequestDetailsToReport(options) {
    await this.allureReport.attachRequestHeaders(options.headers);
    if (options.data) {
      await this.allureReport.attachRequestData(options.data);
    }
  }

  /**
   * Добавляет детали ответа в Allure.
   * @private
   */
  async attachResponseDetailsToReport(response) {
    await this.allureReport.attachResponseHeaders(await response.headers());
    const responseBody = await this.parseResponse(response);
    await this.allureReport.attachResponseData(responseBody);
  }

  /**
   * Парсит тело ответа (JSON/текст).
   * @private
   */
  async parseResponse(response) {
    try {
      return await response.json();
    } catch (error) {
      return await response.text();
    }
  }

  /**
   * Полный цикл API-запроса: отправка, валидация, отчет.
   * @param {object} serviceParams - Параметры сервиса (напр., auth).
   * @returns {Promise<{responsePromise: import('@playwright/test').APIResponse, json: object|null}>} Промис ответа и JSON.
   */
  async createRequest(serviceParams) {
    const url = this.buildUrl();
    const options = await this.buildRequestOptions(serviceParams, url);

    const responsePromise = this.allureReport.allure.step(`${this.option.method}: ${url}`, () => this.sendRequest(options, this.option.method, url));
    const json = await this.handleResponse(responsePromise);
    if (this.option.schema) {
      const validationData = await this.schemaValidator.validate(this.option.schema, json);
      if (!validationData.isValid) await this.allureReport.attachValidationErrorData(validationData.validateErrors);
      expect(validationData.isValid).toEqual(true);
    }
    return { responsePromise, json };
  }

  /**
   * Собирает URL с параметрами.
   * @private
   */
  buildUrl() {
    const url = new URL(this.option.path, this.option.url);
    if (this.option.params) {
      Object.entries(this.option.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url;
  }

  /**
   * Собирает опции запроса (заголовки, auth).
   * @private
   */
  async buildRequestOptions(serviceParams, url) {
    const options = {};
    for (let key in this.option) {
      if (!['url', 'path', 'method', 'schema'].includes(key)) {
        options[key] = this.option[key];
      }
    }
    options['headers'] = this.option.headers || {};

    if (serviceParams.methodAuth === 'token' && serviceParams.token) {
      options['headers']['token'] = serviceParams.token;
    }

    return options;
  }

  /**
   * Обрабатывает ответ и парсит JSON.
   * @private
   */
  async handleResponse(responsePromise) {
    const response = await responsePromise;
    try {
      const buffer = await response.body();
      if (buffer && buffer.length > 0) {
        const jsonString = buffer.toString('utf8');
        if (jsonString.trim() !== '') {
          return JSON.parse(jsonString);
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

/**
 * Обёртка для `API.createRequest` с шагом Allure.
 * @param {string} comment - Описание для шага Allure.
 * @param {object} options - Опции для конструктора `API`.
 * @param {object} [serviceParams={}] - Параметры для `createRequest`.
 * @returns {Promise<{promise: import('@playwright/test').APIResponse, json: object|null}>} Ответ и JSON.
 */
export async function httpRequest(comment, options, serviceParams = {}) {
  const { responsePromise, json } = await allureReport.allure.step(comment, async () => {
    return await new API(options, allureReport).createRequest(serviceParams);
  });

  let awaitedPromise = await responsePromise;
  return { promise: awaitedPromise, json };
}
