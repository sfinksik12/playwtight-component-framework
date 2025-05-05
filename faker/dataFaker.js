import { faker } from '@faker-js/faker';

/*
  Класс расширяющий базовый класс faker
*/

export class DataFaker {
  constructor() {
    this.faker = faker;
  }

  // ФИО ПОЛЬЗОВАТЕЛЯ

  /*
    Генерирует случайное русское имя
    output: 'Алексей'
  */
  generateRandomRussianFirstName() {
    let firstNames = [
      'Алексей',
      'Андрей',
      'Антон',
      'Артем',
      'Артур',
      'Борис',
      'Вадим',
      'Валентин',
      'Валерий',
      'Виктор',
      'Владимир',
      'Вячеслав',
      'Георгий',
      'Григорий',
      'Даниил',
      'Денис',
      'Дмитрий',
      'Евгений',
      'Егор',
      'Иван',
      'Игорь',
      'Илья',
      'Кирилл',
      'Константин',
      'Лев',
      'Максим',
      'Михаил',
      'Николай',
      'Олег',
      'Павел',
      'Петр',
      'Роман',
      'Сергей',
      'Станислав',
      'Тарас',
      'Федор',
      'Филипп',
      'Эдуард',
      'Юрий',
    ];
    let index = Math.floor(Math.random() * firstNames.length);
    return firstNames[index];
  }

  /*
    Генерирует случайную русскую фамилию
    output: 'Иванов'
  */
  generateRandomRussianLastName() {
    let lastNames = [
      'Иванов',
      'Смирнов',
      'Кузнецов',
      'Попов',
      'Васильев',
      'Петров',
      'Соколов',
      'Михайлов',
      'Новиков',
      'Федоров',
      'Морозов',
      'Волков',
      'Алексеев',
      'Васильев',
      'Павлов',
      'Семенов',
      'Тимофеев',
      'Николаев',
      'Сергеев',
      'Кудряшов',
      'Богданов',
      'Воробьев',
      'Филиппов',
      'Марков',
      'Борисов',
      'Козлов',
      'Нестеров',
      'Григорьев',
      'Лавров',
      'Дмитриев',
      'Егоров',
      'Романов',
      'Зайцев',
      'Павлов',
      'Степанов',
      'Ефимов',
      'Максимов',
      'Титов',
      'Миронов',
      'Викторов',
      'Селиверстов',
      'Пестов',
      'Колесников',
      'Карпов',
      'Афанасьев',
      'Власов',
      'Мартынов',
      'Большаков',
      'Суханов',
      'Мирошников',
      'Широков',
      'Ильин',
      'Баранов',
      'Кузнецов',
      'Кудряшов',
      'Беляев',
      'Потапов',
      'Нестеров',
      'Голованов',
      'Белов',
      'Терехов',
      'Молчанов',
      'Андреев',
      'Киселев',
      'Федотов',
      'Антипов',
      'Шашков',
      'Бирюков',
      'Туров',
      'Кондратьев',
      'Сидоров',
      'Рябов',
      'Поляков',
      'Кудряшов',
      'Баранов',
      'Кузнецов',
      'Кудряшов',
      'Беляев',
      'Потапов',
      'Нестеров',
      'Голованов',
      'Белов',
      'Терехов',
      'Молчанов',
      'Андреев',
      'Киселев',
      'Федотов',
      'Антипов',
      'Шашков',
      'Бирюков',
      'Туров',
      'Кондратьев',
      'Сидоров',
      'Рябов',
      'Поляков',
    ];
    let index = Math.floor(Math.random() * lastNames.length);
    return lastNames[index];
  }

  /*
    Генерирует случайное русское отчество
    output: 'Александрович'
  */
  generateRandomRussianMiddleName() {
    let patronymics = [
      'Александрович',
      'Алексеевич',
      'Андреевич',
      'Антонович',
      'Артемович',
      'Артурович',
      'Борисович',
      'Вадимович',
      'Валентинович',
      'Валерьевич',
      'Викторович',
      'Владимирович',
      'Вячеславович',
      'Георгиевич',
      'Григорьевич',
      'Данилович',
      'Денисович',
      'Дмитриевич',
      'Евгеньевич',
      'Егорович',
      'Иванович',
      'Игоревич',
      'Ильич',
      'Кириллович',
      'Константинович',
      'Львович',
      'Максимович',
      'Михайлович',
      'Николаевич',
      'Олегович',
      'Павлович',
      'Петрович',
      'Романович',
      'Сергеевич',
      'Станиславович',
      'Тарасович',
      'Федорович',
      'Филиппович',
      'Эдуардович',
      'Юрьевич',
    ];
    let index = Math.floor(Math.random() * patronymics.length);
    return patronymics[index];
  }

  /*
    Генерирует случайный ИНН физического лица
    output: 994478552321
  */
  getRandomINN() {
    let nums = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
    nums[0] = Math.floor(Math.random() * 9) + 1;
    let weights = [
      [7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
      [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
    ];

    let checkDigit1 = (nums.reduce((sum, num, index) => sum + num * weights[0][index], 0) % 11) % 10;
    let checkDigit2 = (nums.concat([checkDigit1]).reduce((sum, num, index) => sum + num * weights[1][index], 0) % 11) % 10;
    nums.push(checkDigit1, checkDigit2);
    return nums.join('');
  }

  /*
    Генерирует случайный СНИЛС
    output: 95740791958
  */
  generateRandonSNILS() {
    function calculateChecksum(number) {
      return number
        .slice(0, 9)
        .split('')
        .reduce((acc, val, idx) => acc + parseInt(val, 10) * (9 - idx), 0);
    }

    let snilsNumber = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
    let checksum = calculateChecksum(snilsNumber.toString());

    if (checksum > 101) {
      checksum = checksum % 101;
    }
    if (checksum === 100 || checksum === 101) {
      checksum = '00';
    } else {
      checksum = checksum.toString().padStart(2, '0');
    }

    let snils = `${snilsNumber}${checksum}`;
    return snils;
  }

  /*
    Генерирует код полиса ОМС 
    output: 3739920132970424
  */
  generateRandomOMS() {
    let number = '';
    for (let i = 0; i < 16; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  }

  /*
    Генерирует случайный ОГРН
    output: 1117746019885
  */
  getRandomOGRN() {
    let year = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0');

    let region = Math.floor(Math.random() * (100 - 1) + 1)
      .toString()
      .padStart(2, '0');

    let recordNumber = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, '0');

    let ogrn = year + region + recordNumber;
    return ogrn;
  }

  /*
    Генерирует случайный БИК
    output: 044525593
  */
  getRandomBIK() {
    let regionCode = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
    let bankCode = Math.floor(Math.random() * 10000);
    let controlDigit = Math.floor(Math.random() * 10);
    let regionCodeStr = regionCode.toString().padStart(2, '0');
    let bankCodeStr = bankCode.toString().padStart(4, '0');
    let controlDigitStr = controlDigit.toString().padStart(1, '0');

    let bik = `${regionCodeStr}00${bankCodeStr}${controlDigitStr}`;
    return bik;
  }

  // Функция генерации БИК на основе данных
  generateBIK(regionCode, departmentCode, bankCode) {
    if (regionCode < 0 || regionCode > 99) {
      throw new Error('Код региона должен быть в диапазоне от 00 до 99.');
    }
    if (departmentCode < 0 || departmentCode > 99) {
      throw new Error('Условный номер подразделения должен быть в диапазоне от 00 до 99.');
    }
    if (bankCode < 50 || bankCode > 999) {
      throw new Error('Условный номер кредитной организации должен быть в диапазоне от 050 до 999.');
    }

    // Формируем БИК с ведущими нулями, где это требуется
    let bic = `04${regionCode.toString().padStart(2, '0')}${departmentCode.toString().padStart(2, '0')}${bankCode.toString().padStart(3, '0')}`;
    return bic;
  }

  /*
    Генерирует случайный корреспондентский счет
    output: 044525593
  */
  getRandomCorrespondentAccount() {
    let bik = '04';
    for (let i = 0; i < 7; i++) {
      bik += Math.floor(Math.random() * 10);
    }
    let correspondentAcc = bik + '000';

    for (let i = 0; i < 12; i++) {
      correspondentAcc += Math.floor(Math.random() * 10);
    }
    return correspondentAcc;
  }

  // ОТФОРМАТИРОВАННЫЕ ДАТЫ

  /*
    Возвращает текущую дату в формате "YYYY-MM-DD"
    output: "1999-12-12"
  */
  getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is  0!
    let yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  /**
   * Берем дату время сейчас и возвращает ее в строковом виде в нужном формате
   * input: '%d.%m.%Y, %H:%M:%S'
   * output: '17.02.2025, 18:44:44'
   *
   * input: '%d.%m.%Y%Y, %H:%M:%S%S'
   * output: '17.02.20252025, 18:44:4444'
   * @param {String} format - формат выходных данных
   * @param {Object} options - параметры из документации https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   * @returns {String}
   */
  getCurrentDateInFormat(
    format,
    options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' },
  ) {
    let today = new Date();
    let str = Intl.DateTimeFormat('default', options).format(today); // '17.02.2025, 18:44:44'
    let dateParts = {
      day: str.split('.')[0],
      month: str.split('.')[1],
      year: str.split(',')[0].split('.')[2],

      hour: str.split(' ')[1].split(':')[0],
      minute: str.split(':')[1],
      second: str.split(':')[2],
    };

    let out = format
      .replaceAll('%Y', dateParts.year)
      .replaceAll('%m', dateParts.month)
      .replaceAll('%d', dateParts.day)

      .replaceAll('%H', dateParts.hour)
      .replaceAll('%M', dateParts.minute)
      .replaceAll('%S', dateParts.hour);
    return out;
  }

  /**
   * преобразует строку в объект типа Date
   * input: string: "17.02.2025, 18:44:43"
   *        form: '%d.%m.%Y, %H:%M:%S'
   * output: Mon Feb 17 2025 18:44:43 GMT+0300 (Москва, стандартное время)
   * @param {string} string - строка для преобразования
   * @param {string} form - строка для парсинга входных данных
   * @returns {Date}
   */
  dateStringToDate(string, form) {
    const splittedForm = form.split('%');

    const splittedFormWithoutblank = splittedForm.filter(item => item !== '');

    const d = {};
    let currentString = string;

    // оставляем только разделители
    for (let i = 0; i < splittedFormWithoutblank.length; i++) {
      let formPart = splittedFormWithoutblank[i];
      formPart = formPart.replace(/d/g, '').replace(/m/g, '').replace(/Y/g, '').replace(/H/g, '').replace(/M/g, '').replace(/S/g, '');
      if (formPart === '') {
        d[splittedFormWithoutblank[i]] = currentString;
      }
      // в остальных случаях по разделителю забираем первый элемент, а остальные по тому же разделителю собираем обратно
      else {
        const [get_part, ...keep_part] = currentString.split(formPart);
        currentString = keep_part.join(formPart);

        d[splittedFormWithoutblank[i]] = get_part;
      }
    }
    let objClear = {};
    let dateOut;
    // в свойствах кроме нужных нам данных есть мусор ввиде запятых и прочих разделителей, избавляемся от него
    for (let p in d) {
      if (p.includes('d')) {
        objClear['d'] = d[p];
      } else if (p.includes('m')) {
        objClear['m'] = d[p] - 1;
      } else if (p.includes('Y')) {
        objClear['Y'] = d[p];
      } else if (p.includes('H')) {
        objClear['H'] = d[p];
      } else if (p.includes('M')) {
        objClear['M'] = d[p];
      } else if (p.includes('S')) {
        objClear['S'] = d[p];
      }
    }
    // создаем выходной объект типа Date
    dateOut = new Date();
    if (objClear['Y']) dateOut.setYear(objClear['Y']);
    if (objClear['m']) dateOut.setMonth(objClear['m']);
    if (objClear['d']) dateOut.setDate(objClear['d']);
    if (objClear['H']) dateOut.setHours(objClear['H']);
    if (objClear['M']) dateOut.setMinutes(objClear['M']);
    if (objClear['S']) dateOut.setSeconds(objClear['S']);
    return dateOut;
  }

  /*
    Генерирует случайную дату рождения человека старше 20 лет в формате "YYYY-MM-DD",
    output: "1999-12-12"
  */
  getRandomBirthdayDate() {
    let fromYear = 1960;
    let toYear = new Date().getFullYear() - 20;
    let year = Math.floor(Math.random() * (toYear - fromYear + 1)) + fromYear;
    let month = Math.floor(Math.random() * 12) + 1;
    let daysInMonth = new Date(year, month, 0).getDate();
    let day = Math.floor(Math.random() * daysInMonth) + 1;
    let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
  }

  /*
    Возвращает текущую дату и время в формате ISO  8601
    output: "2023-04-05T14:30:00"
  */
  getCurrentFormatedDateTime() {
    let now = new Date();
    let year = now.getUTCFullYear();
    let month = String(now.getUTCMonth() + 1).padStart(2, '0');
    let day = String(now.getUTCDate()).padStart(2, '0');
    let hours = String(now.getUTCHours()).padStart(2, '0');
    let minutes = String(now.getUTCMinutes()).padStart(2, '0');
    let seconds = String(now.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  /*
    Возвращает текущую дату и время в формате ISO 8601 с учетом часового пояса
    output: '2024-01-29T14:40:04+03:00'
  */
  getCurrentISODateTime() {
    let date = new Date();
    let tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
        return (num < 10 ? '0' : '') + num;
      };

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' +
      pad(Math.abs(tzo) % 60)
    );
  }

  /*
    Возвращает текущую дату и время в формате ISO 8601 с буквой Z в конце
    output: '2024-01-29T14:40:04+03:00Z'
  */

  getCurrentDateTimeInISOFormat() {
    // Создаем новый объект Date для получения текущей даты и времени
    const now = new Date();

    // Форматируем дату и время в ISO строку
    const isoString = now.toISOString();

    return isoString;
  }

  /*
    Возвращает текущую дату без времени
    output: '2024-01-29'
  */
  getTodayDateString() {
    // Получаем сегодняшнюю дату и время
    const today = new Date();

    // Конвертируем дату в строку в формате ISO
    const isoString = today.toISOString();

    // Обрезаем строку до года, месяца и дня
    const dateOnly = isoString.slice(0, 10);

    return dateOnly;
  }

  getGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /*
      Возвращает случайную дату позже текущей, без времени
      output: '2024-01-29'
    */
  generateFutureRandomDate(maxDaysInFuture) {
    // Получаем текущую дату
    const now = new Date();

    // Генерируем случайное количество дней в будущем до maxDaysInFuture
    const futureDays = Math.floor(Math.random() * maxDaysInFuture) + 1;

    // Устанавливаем дату на будущее, прибавляя случайное количество дней к текущей дате
    const futureDate = new Date(now.getTime() + futureDays * 24 * 60 * 60 * 1000);

    // Преобразуем будущую дату в строку в формате ISO и обрезаем часть со временем
    const formattedFutureDate = futureDate.toISOString().split('T')[0];

    return formattedFutureDate;
  }

  /*
      Возвращает случайную дату позже текущей в фомате ISO 8601
      output: '2024-01-29T14:40:04+03:00Z'
    */
  generateFutureRandomDateIso(maxDaysInFuture) {
    // Получаем текущую дату
    const now = new Date();

    // Генерируем случайное количество дней в будущем
    const futureDays = Math.floor(Math.random() * maxDaysInFuture) + 1;

    // Устанавливаем дату на будущее, прибавляя случайное количество дней к текущей дате
    const futureDate = new Date(now.getTime() + futureDays * 24 * 60 * 60 * 1000);

    return futureDate;
  }

  /*
      Возвращает случайную дату не равную текущей (без времени)
      output: '2024-01-29'
    */

  generateRandomDate() {
    const today = new Date();
    let randomDate = new Date();

    // Генерируем случайный год, начиная с 2000 года до текущего года
    randomDate.setFullYear(2000 + Math.floor(Math.random() * (today.getFullYear() - 1999)));

    // Генерируем случайный месяц
    randomDate.setMonth(Math.floor(Math.random() * 12));

    // Генерируем случайный день, учитывая количество дней в месяце
    const daysInMonth = new Date(randomDate.getFullYear(), randomDate.getMonth() + 1, 0).getDate();
    randomDate.setDate(Math.floor(Math.random() * daysInMonth));

    // Форматируем дату в формат "YYYY-MM-DD"
    const formattedDate = `${randomDate.getFullYear()}-${String(randomDate.getMonth() + 1).padStart(2, '0')}-${String(randomDate.getDate()).padStart(2, '0')}`;

    return formattedDate;
  }

  // ТЕЛЕФОННЫЕ НОМЕРА

  /*
    Генерирует сокращенный  номер телефона
    output: "0536588504" - 10 numbers, номер телефона пока не валидируется
  */
  getShortenedPhoneNumber() {
    let nums = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    return '0' + nums.join('');
  }

  /*
    Генерирует русский номер телефона
    output: "79536541193" - 11 numbers
  */
  getRandomRussianPhoneNumber() {
    let nums = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
    return '7953' + nums.join('');
  }

  // ПАСПОРТНЫЕ ДАННЫЕ

  /*
    Генерирует случайную серию паспорта
    output: 3234
  */
  getRandomPassportSeries() {
    var nums = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
    return nums.slice(0, 4).join('');
  }

  /*
    Генерирует случайный  номер паспорта
    output: 311181
  */
  getRandomPassportNumber() {
    var nums = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
    return nums.slice(4).join('');
  }

  /*
    Генерирует случайный код выдавшего органа
    output: 609080
  */
  getRandomIssuerCode() {
    var nums = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));
    return nums.join('');
  }

  /*
    Генерирует случайную строку
    output: Z1MQH6GLrKK
  */
  generateRandomString(minLength, maxLength) {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  }

  /*
    Генерирует случайный номер водительского удостоверения
    output: "3345645678"
  */
  generateRandomDriverLicense() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    const fixedLength = 10; // Задаем фиксированную длину строки

    for (let i = 0; i < fixedLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // АДРЕСА
  // Массив с возможными значениями регионов

  /*
    Генерирует случайный регион
    output: Москва
  */
  generateRandomRegion() {
    let regions = [
      'Москва',
      'Санкт-Петербург',
      'Новосибирск',
      'Екатеринбург',
      'Нижний Новгород',
      'Казань',
      'Челябинск',
      'Омск',
      'Самара',
      'Ростов-на-Дону',
      'Красноярск',
      'Иркутск',
      'Владивосток',
      'Якутск',
      'Уфа',
      'Краснодар',
      'Волгоград',
      'Астрахань',
      'Саратов',
      'Тольятти',
      'Калининград',
      'Тюмень',
      'Оренбург',
      'Новокузнецк',
      'Красноярский край',
      'Иркутская область',
      'Владивостокский край',
      'Якутская область',
      'Ульяновская область',
      'Краснодарский край',
      'Волгоградская область',
      'Астраханская область',
      'Саратовская область',
      'Тольяттинская область',
      'Калининградская область',
      'Тюменская область',
      'Оренбургская область',
      'Новосибирская область',
      'Хабаровский край',
      'Амурская область',
      'Магаданская область',
      'Чукотский автономный округ',
      'Сахалинская область',
      'Камчатский край',
      'Приморский край',
      'Ямало-Ненецкий автономный округ',
      'Ханты-Мансийский автономный округ - Югра',
      'Чеченская Республика',
      'Республика Ингушетия',
      'Республика Калмыкия',
      'Республика Татарстан',
      'Республика Башкортостан',
      'Республика Марий Эл',
      'Республика Саха (Якутия)',
      'Республика Тыва',
      'Республика Адыгея',
      'Республика Северная Осетия - Алания',
      'Республика Карачаево-Черкесия',
      'Республика Дагестан',
      'Республика Чечня',
      'Республика Кабардино-Балкария',
      'Республика Северная Осетия',
      'Республика Алтай',
      'Республика Хакасия',
      'Республика Бурятия',
      'Республика Саха',
      'Республика Якутия',
      'Республика Крым',
      'Севастополь',
    ];
    let randomRegion = regions[Math.floor(Math.random() * regions.length)];
    return randomRegion;
  }

  /*
    Генерирует случайный район
    output: Василеостровский район
  */
  generateRandomDistrict() {
    let districts = [
      'Адмиралтейский район',
      'Василеостровский район',
      'Выборгский район',
      'Калининский район',
      'Кировский район',
      'Колпинский район',
      'Красногвардейский район',
      'Красносельский район',
      'Кронштадтский район',
      'Курортный район',
      'Московский район',
      'Невский район',
      'Петроградский район',
      'Петродворцовый район',
      'Приморский район',
      'Пушкинский район',
      'Фрунзенский район',
      'Центральный район',
    ];
    let randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    return randomDistrict;
  }

  /*
    Генерирует случайный город
    output: Москва
  */
  generateRandomCity() {
    let cities = [
      'Москва',
      'Санкт-Петербург',
      'Новосибирск',
      'Екатеринбург',
      'Нижний Новгород',
      'Самара',
      'Омск',
      'Казань',
      'Челябинск',
      'Ростов-на-Дону',
      'Уфа',
      'Красноярск',
      'Волгоград',
      'Пермь',
      'Краснодар',
      'Саратов',
      'Тольятти',
      'Ижевск',
      'Барнаул',
      'Ульяновск',
      'Иркутск',
      'Владивосток',
      'Ярославль',
      'Тюмень',
      'Махачкала',
      'Оренбург',
      'Новокузнецк',
      'Курск',
      'Ставрополь',
      'Тамбов',
      'Калининград',
      'Астрахань',
      'Сургут',
      'Череповец',
      'Смоленск',
      'Тверь',
      'Киров',
      'Ташкент',
      'Алматы',
      'Новороссийск',
    ];
    let randomCity = cities[Math.floor(Math.random() * cities.length)];
    return randomCity;
  }

  /*
    Генерирует случайную улицу
    output: Ленина
  */
  generateRandomStreet() {
    let streets = [
      'Ленина',
      'Мира',
      'Советская',
      'Пушкина',
      'Гоголя',
      'Чайковского',
      'Толстого',
      'Достоевского',
      'Булгакова',
      'Тургенева',
      'Тимирязева',
      'Красная',
      'Красноармейская',
      'Краснофлотская',
      'Красный проспект',
      'Красногвардейская',
      'Краснооктябрьская',
      'Красноярская',
      'Краснознаменская',
      'Красносельская',
      'Красноуфимская',
      'Красноуральская',
      'Красноярская',
    ];
    let randomStreet = streets[Math.floor(Math.random() * streets.length)];
    return randomStreet;
  }

  /*
    Генерирует случайный номер дома
    output: 100
  */
  generateRandomHouseNumber() {
    let houseNumber = Math.floor(Math.random() * 100) + 1;
    return houseNumber.toString();
  }

  /*
    Генерирует случайный корпуса
    output: 5
  */
  generateRandomHousingNumber() {
    let housingNumber = Math.floor(Math.random() * 10) + 1;
    return housingNumber.toString();
  }

  /*
    Генерирует случайный нормер здания
    output: 5
  */
  generateRandomBuildingNumber() {
    let BuildingNumber = Math.floor(Math.random() * 100) + 1;
    return BuildingNumber.toString();
  }

  /*
    Генерирует случайный номер квартиры
    output: 14
  */
  generateRandomFlatNumber() {
    let flatNumber = Math.floor(Math.random() * 200) + 1;
    return flatNumber.toString();
  }

  /*
  Генерирует случайное значение из заданных: inn, hashPassport, hashSnils, phoneNumber, fastPayNumber, accountNumber
  */
  getRandomValue() {
    const values = ['inn', 'hashPassport', 'hashSnils', 'phoneNumber', 'fastPayNumber', 'accountNumber'];
    return values[Math.floor(Math.random() * values.length)];
  }

  /*
  Генерирует случайное значение из заданных: 0, 1, 2, 3
  */
  getRandomNumber() {
    // Генерируем случайное число от 0 до 3
    const randomIndex = Math.floor(Math.random() * 4);

    // Возвращаем одно из четырех возможных значений: 0, 1, 2 или 3
    return [0, 1, 2, 3][randomIndex];
  }

  /*
  Генерирует строку из случайных 20 чисел
  output: 00900100000000123456
  */
  generateRandomNumberString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }

  generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
