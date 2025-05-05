export class Helpers {
  /**
   * Извлекает все числа из строки.
   * @param {string} str - Входная строка.
   * @returns {Promise<number[]>} Массив найденных чисел.
   * @example getNumbersFromString("abc123def456ghi789") // => [123, 456, 789]
   */
  async getNumbersFromString(str) {
    let regex = /\d+/g;
    let matches = str.match(regex);
    let numbers = matches ? matches.map(Number) : [];
    return numbers;
  }

  /**
   * Извлекает число из строки с ценой (удаляя пробелы).
   * @param {string} str - Строка с ценой.
   * @returns {Promise<number>} Числовое значение цены.
   * @example getNumbersFromPriceString("1 567 Р") // => 1567
   */
  async getNumbersFromPriceString(str) {
    let stringWithoutSpaces = str.replace(/\s/g, '');
    let number = parseInt(stringWithoutSpaces, 10);
    return number;
  }

  /**
   * Проверяет, отсортирован ли массив чисел по убыванию.
   * @param {number[]} arr - Массив чисел.
   * @returns {Promise<boolean>} true, если отсортирован по убыванию, иначе false.
   */
  async arraySortedDescending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Делает первую букву строки заглавной.
   * @param {string} str - Входная строка.
   * @returns {Promise<string>} Строка с заглавной первой буквой.
   * @example capitalizeFirstLetter("hello") // => "Hello"
   */
  async capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Находит первый объект в массиве по значению поля.
   * @param {Array<object>} array - Массив объектов.
   * @param {string} field - Имя поля для поиска.
   * @param {*} value - Искомое значение поля.
   * @returns {object|null} Найденный объект или null.
   */
  findObjectByField(array, field, value) {
    for (let obj of array) {
      if (obj[field] === value) {
        return obj;
      }
    }
    return null;
  }

  /**
   * Глубоко сравнивает два объекта только по общим ключам.
   * Выводит ошибки сравнения в консоль.
   * @param {object} obj1 - Первый объект.
   * @param {object} obj2 - Второй объект.
   * @returns {boolean} true, если общие ключи совпадают, иначе false.
   */
  deepCompareOnlyCommonKeys(obj1, obj2) {
    const commonKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]).values();
    const filteredKeys = Array.from(commonKeys).filter(key => obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key));

    for (let key of filteredKeys) {
      if (typeof obj1[key] !== typeof obj2[key]) {
        console.error(`Типы данных для ключа "${key}" не совпадают.`);
        return false;
      }

      if ((typeof obj1[key] === 'object' && obj1[key] !== null) || Array.isArray(obj1[key])) {
        try {
          if (!deepCompareOnlyCommonKeys(obj1[key], obj2[key])) {
            console.error(`Значения для ключа "${key}" не совпадают.`);
            return false;
          }
        } catch (error) {
          console.error(`${error.message} для ключа "${key}".`);
          return false;
        }
      } else if (String(obj1[key]) !== String(obj2[key])) {
        console.error(`Значения для ключа "${key}" не совпадают: ${JSON.stringify({ value1: obj1[key], value2: obj2[key] })}.`);
        return false;
      }
    }
    return true;
  }

  /**
   * Создает путь к файлу с временной меткой в папке ./downloads.
   * @param {string} fileExt - Расширение файла (без точки).
   * @returns {string} Сгенерированный путь к файлу.
   */
  createFilePath(fileExt) {
    let now = new Date();
    let date = now.toISOString().split('T')[0];
    let time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    return `./downloads/file_${date}_${time}.${fileExt}`;
  }

  /**
   * Создает задержку выполнения.
   * @param {number} ms - Время задержки в миллисекундах.
   * @returns {Promise<void>}
   */
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Возвращает массив значений поля 'name' из объектов, у которых указанное поле `field` существует и не пустое.
   * @param {Array<object>} objects - Массив объектов.
   * @param {string} field - Имя поля для проверки.
   * @returns {Array<string>} Массив имен.
   * @throws {Error} Если первый параметр не массив.
   */
  getNamesWithFieldData(objects, field) {
    if (!Array.isArray(objects)) {
      throw new Error('Первый параметр должен быть массивом объектов.');
    }

    let result = [];

    for (const obj of objects) {
      if (typeof obj === 'object' && obj !== null) {
        if (obj.hasOwnProperty(field)) {
          let value = obj[field];
          if (value !== null && value !== undefined) {
            if (typeof value === 'string') {
              if (value.trim() !== '') {
                if (obj.hasOwnProperty('name')) {
                  result.push(obj['name']);
                }
              }
            } else if (Array.isArray(value)) {
              if (value.length > 0) {
                if (obj.hasOwnProperty('name')) {
                  result.push(obj['name']);
                }
              }
            } else if (typeof value === 'object') {
              if (Object.keys(value).length > 0) {
                if (obj.hasOwnProperty('name')) {
                  result.push(obj['name']);
                }
              }
            } else {
              if (obj.hasOwnProperty('name')) {
                result.push(obj['name']);
              }
            }
          }
        }
      }
    }
    return result;
  }

  /**
   * Конвертирует строку формата "DD.MM.YYYY HH:MM" в объект Date.
   * @param {string} str - Строка с датой и временем.
   * @returns {Date} Объект Date.
   * @example stringToDate("05.02.2025 11:41") // => Date object for Feb 5, 2025, 11:41
   */
  stringToDate(str) {
    const parts = str.split(/\.| |:/);
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    const hours = parseInt(parts[3]);
    const minutes = parseInt(parts[4]);
    return new Date(year, month, day, hours, minutes);
  }

  /**
   * Трансформирует строку календаря из "Новый календарь - ISO_DATE" в "Новый календарь - DD.MM.YYYY HH:MM".
   * @param {string|any} name - Имя календаря или другое значение.
   * @returns {string|any} Трансформированная строка или исходное значение.
   */
  transformCalendarDate(name) {
    if (!name) return '';
    if (typeof name !== 'string') return name;

    const match = name.match(/Новый календарь - (.+)$/);
    if (match && match[1]) {
      const date = new Date(match[1]);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `Новый календарь - ${day}.${month}.${year} ${hours}:${minutes}`;
    }
    return name;
  }
}
