"use strict";

/**
 * @property {object} settings Настройки корзины товаров.
 * @property {string} settings.countSelector Селектор коливества купленного товара
 * @property {string} settings.priceSelector Селектор стоимости купленного товара
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь.
 * @property {HTMLElement} CountEl Место для показа количества товаров.
 * @property {HTMLElement} PriceEl Место для показа цены всех товаров.
 */
const basket = {
  settings: {
    countSelector: '#basket-count',
    priceSelector: '#basket-price',
  },
  goods: [],
  countEl: null,
  priceEl: null,

  /**
   * Инициализирует переменные для корзины и показывает эти значения.
   * @param {Object} settings Object with user's <span>
   */
  init(settings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, settings);

    //init elements for output price and count of goods
    this.countEl = document.getElementById(this.settings.countSelector);
    this.priceEl = document.getElementById(this.settings.priceSelector);

    //add EventListener on all buttons
    this.addEventOnButtons();
  },

  /**
   * Set EventListner on all Buttons by click on it
   */
  addEventOnButtons() {
    //get NodeList array of all buttons
    const arr = document.querySelectorAll('button');
    //add for each EventListener by Click
    for (const arrCount of arr) {
      arrCount.addEventListener('click', (event) => this.add(event.target.dataset.name,
        event.target.dataset.price));
    }
  },

  /**
   * Отображает количество всех товаров и их цену.
   */
  render() {
    //put price and count into the relevant elements
    this.priceEl.textContent = this.getGoodsPrice();
    this.countEl.textContent = this.goods.length;
  },

  /**
   * Считает и возвращает цену всех купленных товаров из массива this.goods.
   * @returns {number} Цену всех купленных товаров.
   */
  getGoodsPrice() {
    let summ = 0;
    //summ all goods in array
    for (const elem of this.goods) {
      summ += +elem.price;
    }
    return summ;

    //Don't go there, it will eat you.
    /*//Get target which clicked user
    const clickedButton = event.target;
    //Get name and price which selected user
    const name = clickedButton.dataset.name;
    const price = clickedButton.dataset.price;
    //add selected good to array (card)
    this.add(name, price);*/
  },

  /**
   * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
   * @param goodName Название товара.
   * @param goodPrice Цена товара.
   */
  add(goodName, goodPrice) {
    //push selected good to arr (cart)
    this.goods.push({price: goodPrice, name: goodName});
    //output price and count of goods
    this.render();

    this.checkCount();
  },

  /**
   * a little easter eggs =)
   */
  checkCount() {
    if (this.goods.length > 10) {
      alert('Crazy? Why do you need so much goods?');
    }
  }
};

window.onload = () => basket.init({countSelector: 'basket-count', priceSelector: 'basket-price'});