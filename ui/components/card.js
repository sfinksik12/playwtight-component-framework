import { allure } from 'allure-playwright';
import { BaseComponent } from './baseComponent.js';

export class Card extends BaseComponent {
  constructor(page, locator, name) {
    super(page);

    this.locator = locator;
    this.name = name;
    this.type = 'card';
  }
}
