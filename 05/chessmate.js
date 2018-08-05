"use strict";

/**
 * Конфигурация шахматной доски
 * @property {int} rowsCount - Колчиство строк
 * @property {int} colsCount - Колчиство столбцов
 * @property {string} blackCellColor - Цвет черных клеток
 * @property {array} colName - Имена столбцов
 * @property {string} chessRook - HTML код турки из fontawesome
 * @property {string} chessKnight - HTML код коня из fontawesome
 * @property {string} chessBishop - HTML код слона из fontawesome
 * @property {string} chessQueen - HTML код королевы из fontawesome
 * @property {string} chessKing - HTML код короля из fontawesome
 * @property {string} chesPawn - HTML код пешки из fontawesome
 *
 */
const configuration = {
  rowsCount: 10,
  colsCount: 10,
  blackCellColor: '#83560c',
  colName: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  chessRook: '<i class="fas fa-chess-rook"></i>',
  chessKnight: '<i class="fas fa-chess-knight"></i>',
  chessBishop: '<i class="fas fa-chess-bishop"></i>',
  chessQueen: '<i class="fas fa-chess-queen"></i>',
  chessKing: '<i class="fas fa-chess-king"></i>',
  chesPawn: '<i class="fas fa-chess-pawn"></i>',

};

/**
 * Основной объект шахмат
 * @property {configuration} configuration - Объект с настройками доски
 * @property {HTMLElement} tableContainer - Объект с настройками доски
 */
const chess = {
  configuration,
  // cellElements: null,
  tableContainer: document.getElementById('tb-chess'),

  /**
   * Проверка будет ли фон ячейки черным по позиции
   * @param {int} rowNum - номер строки
   * @param {int} colNum - номер столбца
   * @return {boolean} - возвращение true если фон черный, false если белый
   */
  isCellBlack(rowNum, colNum) {
    return rowNum !== 0 && rowNum !== this.configuration.rowsCount - 1 &&
      colNum !== 0 && colNum !== this.configuration.colsCount - 1 &&
      (colNum % 2 === 1 && rowNum % 2 === 0 || colNum % 2 === 0 && rowNum % 2 === 1);
  },

  /**
   * Прописывает имена строк в виде цифр от 8 сверху до 1 снизу
   * @param {int} rowNum - номер строки
   * @param {int} colNum - номер столбца
   * @param {HTMLElement} elem - элемент HTML в который вставляем текст
   */
  renderNameRow(rowNum, colNum, elem) {
    if (rowNum !== 0 && rowNum !== this.configuration.rowsCount - 1) {
      if (colNum === 0 || colNum === this.configuration.colsCount - 1) {
        elem.innerText = 8 - rowNum + 1;
      }
    }
  },

  /**
   * Прописывает имена столбцов в виде букв лат алфавита от a до h
   * @param {int} rowNum - номер строки
   * @param {int} colNum - номер столбца
   * @param {HTMLElement} elem - элемент HTML в который вставляем текст
   */
  renderNameCol(rowNum, colNum, elem) {
    if (colNum !== 0 && colNum !== this.configuration.rowsCount - 1) {
      if (rowNum === 0 || rowNum === this.configuration.colsCount - 1) {
        elem.innerText = this.configuration.colName[colNum - 1];
      }
    }
  },

  /**
   * Проверка на цвет текста, снизу доски должны быть белые фигуры
   * @param {int} rowNum - номер строки
   * @param {HTMLElement} elem - элемент HTML в который вставляем стиль цвета
   */
  isFontColorWhite(rowNum, elem) {
    //если нижняя половина доски
    rowNum > 4 ? elem.style.color = '#fff' : elem.style.color = '#000';
  },

  /**
   * Прорисовывает фигуры с пом кодов fontawesome
   * @param {int} rowNum - номер строки
   * @param {int} colNum - номер столбца
   * @param {HTMLElement} elem - элемент HTML в который вставляем код
   */
  renderFigure(rowNum, colNum, elem) {
    //проверяме не из крайних ли столбцов или строк данный элемент
    if (colNum !== 0 && rowNum !== 0 &&
      rowNum !== this.configuration.rowsCount - 1 && colNum !== this.configuration.colsCount - 1) {

      //рисуем пешки
      if (rowNum === 2 || rowNum === 7) {
        this.isFontColorWhite(rowNum, elem);
        elem.innerHTML = this.configuration.chesPawn;
      }

      //рисуем остальные фигуры
      if (rowNum === 1 || rowNum === 8) {
        this.isFontColorWhite(rowNum, elem);
        switch (colNum) {
          case 1:
          case 8:
            elem.innerHTML = this.configuration.chessRook;
            break;
          case 2:
          case 7:
            elem.innerHTML = this.configuration.chessKnight;
            break;
          case 3:
          case 6:
            elem.innerHTML = this.configuration.chessBishop;
            break;
          case 4:
            elem.innerHTML = this.configuration.chessQueen;
            break;
          case 5:
            elem.innerHTML = this.configuration.chessKing;
            break;
        }
      }

    }
  },

  /**
   * Метод рисует поле для шахмат
   */
  renderMap() {
    //this.cellElements = [];
    for (let row = 0; row < this.configuration.rowsCount; row++) {

      const trElem = document.createElement('tr');
      this.tableContainer.appendChild(trElem);

      for (let col = 0; col < this.configuration.colsCount; col++) {
        const tdElem = document.createElement('td');
        if (this.isCellBlack(row, col)) {
          tdElem.style.backgroundColor = this.configuration.blackCellColor;
        }
        this.renderNameRow(row, col, tdElem);
        this.renderNameCol(row, col, tdElem);
        this.renderFigure(row, col, tdElem);
        // this.cellElements.push(tdElem);
        trElem.appendChild(tdElem);
      }
    }
  },


};

//начало кода
chess.renderMap();