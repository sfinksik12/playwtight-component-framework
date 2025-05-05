# UI-слой автоматизации тестов

Этот директория содержит слой абстракции над Playwright для использования в UI-тестах. Реализована по паттернам Page Object Model (POM) и Component Object Model (COM).

## Структура

- **components/** — базовые UI компоненты (кнопки, инпуты, и т.д.)
- **fragments/** — фрагменты страниц, состоящие из компонентов (блоки, виджеты, модальные окна)
- **pages/** — объекты страниц

## Основные классы

- `BaseComponent` — базовый класс для всех компонентов
- `BaseFragment` — базовый класс для фрагментов
- `BasePage` — базовый класс для страниц

## Основные компоненты и их методы

### BaseComponent

Базовый класс для всех компонентов с основными методами:

```javascript
// Создание компонента
const button = new Button(page, '.submit-button', 'Кнопка отправки формы');
```

## Примеры использования

### Создание фрагмента

```javascript
// Пример создания класса компонента поиска
import { Input } from '../components/input.js';
import { Button } from '../components/button.js';

export class SearchBarFragment {
  constructor(page) {
    this.page = page;
    this.searchInput = new Input(page, '.search-input', 'Поле поиска');
    this.searchButton = new Button(page, '.search-button', 'Кнопка поиска');
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
import { BasePage } from './basePage.js';
import { SearchBar } from '../fragments/searchBarFragment.js';

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
import { test, expect } from '@playwright/test';
import { SearchPage } from '../ui/pages/searchPage.js';

test('Поиск должен возвращать результаты', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.openPage();
  await searchPage.searchBar.searchFor('Playwright');
});
```

## Интеграция с Allure

Все действия автоматически записываются в отчет Allure, включая:

- Навигацию между страницами
- Взаимодействие с компонентами
- Проверки
- Запросы к API
