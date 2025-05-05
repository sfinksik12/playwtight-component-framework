import XLSX from 'xlsx';

export class ExcelHandler {
  /**
   * Загружает Excel файл и конвертирует первый лист в массив JSON-объектов.
   * @param {string} filePath - Путь к Excel файлу.
   * @returns {Array<object>|null} Массив объектов или null в случае ошибки.
   */
  convertToJson(filePath) {
    try {
      let workbook = XLSX.readFile(filePath);
      let sheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[sheetName];

      let jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        dateNF: 'yyyy-mm-dd',
        defval: '',
      });

      return jsonData; // Возвращаем массив объектов напрямую, без нумерации
    } catch (error) {
      console.error('Ошибка при конвертации данных:', error);
      return null;
    }
  }

  /**
   * Возвращает данные указанной строки (предполагается, что `this.data` существует и имеет формат {row1: ..., row2: ...}).
   * @param {number} rowNumber - Номер строки (начиная с 1?).
   * @returns {object|undefined} Данные строки или undefined.
   */
  getRow(rowNumber) {
    return data?.[`row${rowNumber}`];
  }

  /**
   * Возвращает все данные (предполагается, что `this.data` существует).
   * @returns {object|undefined} Все данные.
   */
  getAllData() {
    return data;
  }

  /**
   * Сохраняет данные (предполагается, что `this.data` существует) в новый Excel файл.
   * @param {string} outputPath - Путь для сохранения нового Excel файла.
   * @returns {boolean} true в случае успеха, false в случае ошибки.
   */
  saveToFile(outputPath) {
    try {
      let arrayData = Object.values(data);
      let newWorksheet = XLSX.utils.json_to_sheet(arrayData);
      let newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
      XLSX.writeFile(newWorkbook, outputPath);
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении файла:', error);
      return false;
    }
  }

  /**
   * Возвращает список всех листов в файле (предполагается, что `this.workbook` существует).
   * @returns {Array<string>} Массив имен листов.
   */
  getSheetNames() {
    return workbook?.SheetNames || [];
  }

  /**
   * Переключает активный лист (предполагается, что `this.workbook` и `this.worksheet` существуют).
   * @param {string} sheetName - Имя листа для переключения.
   * @returns {boolean} true если лист найден и переключен, иначе false.
   */
  switchSheet(sheetName) {
    if (workbook.SheetNames.includes(sheetName)) {
      worksheet = workbook.Sheets[sheetName];
      return true;
    }
    return false;
  }
}
