# UI-слой автоматизации тестов

Это слой абстракции над Playwright для использования в UI-тестах. Реализована по паттернам Page Object Model (POM) и Component Object Model (COM).

## Структура

- **components/** — базовые UI компоненты (кнопки, инпуты, и т.д.)
- **fragments/** — фрагменты страниц, состоящие из компонентов (блоки, виджеты, модальные окна)
- **pages/** — объекты страниц

## Основные классы

- `BaseComponent` — базовый класс для всех компонентов
- `BaseFragment` — базовый класс для фрагментов
- `BasePage` — базовый класс для страниц

## Основные компоненты и их методы

### Создание компонента

```javascript
// Создание компонента
const button = new Button(page, ".submit-button", "Кнопка отправки формы");
```

### Создание фрагмента

```javascript
// Пример создания класса компонента поиска
import { Input } from "../components/input.js";
import { Button } from "../components/button.js";

export class SearchBarFragment {
  constructor(page) {
    this.page = page;
    this.searchInput = new Input(page, ".search-input", "Поле поиска");
    this.searchButton = new Button(page, ".search-button", "Кнопка поиска");
  }

  async search(text) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }
}
```

### Создание страницы

```javascript
// Пример создания страницы поиска
import { BasePage } from "./basePage.js";
import { SearchBar } from "../fragments/searchBarFragment.js";

export class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchBarFragment = new SearchBarFragment(page);
  }
}
```

### Использование в тестах

```javascript
// Пример использования страницы в тесте
import { test, expect } from "@playwright/test";
import { SearchPage } from "../ui/pages/searchPage.js";

test("Поиск должен возвращать результаты", async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.openPage();
  await searchPage.searchBar.searchFor("Playwright");
});
```

# API-слой автоматизации тестов

Это слой абстракции над Playwright для использования в API-тестах.

## Пример класса взаимодействия с микросервисом

```javascript
import { httpRequest, Helpers, API } from "base-api-test";
import dotenv from "dotenv";
dotenv.config();

export class User extends API {
  constructor() {
    super();
    this.serviceData = {};
    this.helpers = new Helpers();
  }

  async post_api_create(data) {
    let comment = "Создать пользователя";
    let options = {
      url: this.serviceData.baseUrl,
      path: "/api/create",
      data: data,
      method: "POST",
    };
    return await httpRequest(comment, options, this.serviceData);
  }

  async delete_api_delete(data) {
    let comment = "Удалить пользователя";
    let options = {
      url: this.serviceData.baseUrl,
      path: "/api/delete",
      data: data,
      method: "DELETE",
    };
    return await httpRequest(comment, options, this.serviceData);
  }
}
```

## Пример теста методов микросервиса

```javascript
import { allure } from "allure-playwright";
import { test, expect } from "../src/fixtures/mergeFixtures";

test("Создание пользователя - успешно", async ({ auth }) => {
  allure.epic("/api/create");
  allure.owner("@name");

  let request = {
    name: "user",
  };

  let createdUser = await auth.post_api_create(request);
  expect(createdUser.promise.status()).toBe(200);
  expect(createdUser.json.name).toBe(request.name);
});
```
