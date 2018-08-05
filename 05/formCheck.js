"use strict";

/**
 * Объект отвечающий за валидацию
 * @property {string} nameHint - Подсказка для имени
 * @property {string} telHint - Подсказка для телефона
 * @property {string} passHint - Подсказка для пароля
 * @property {string} passConfirmHint - Подсказка для повтора пароля
 * @property {HTMLElement} elementForm - Форма в которой проходят проверки
 */
const params = {
  nameHint: 'Имя - должно содержать как минимум 1 символ, не более 50 символов.',
  telHint: 'Телефон - должно содержать 11 цифр, не больше, не меньше.',
  passHint: 'Пароль - минимум 5 символов, максимум 50.',
  passConfirmHint: 'Повтор пароля - значение должно совпадать с полем пароль.',
  elementForm: document.querySelector('form'),

  /**
   * Создание подсказки
   * @param {string} message - Сообщение подсказки
   * @return {HTMLElement} - элемент который мы добавляем в DOM
   */
  createHint(message) {
    //создаем тег div
    const div = document.createElement('div');
    //В текст ставим подсказку
    div.textContent = message;
    //делаем стиль тексту
    div.classList.add('warningText');
    return div;
  },

  /**
   * Создание подсказки
   * @param {object} elem - Элемент к которому подсказку нужно удалить
   */
  removeHint(elem) {
    //в моем коде 1й элемент HTML collection это и есть подсказка, так то бы конечно искать послений элемент надо
    const hint = elem.parentElement.children[1];
    //Если есть такой элемент удаляем
    if (hint) {
      hint.remove();
    }
  },

  /**
   * Валидация поля ввода имени, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  nameContainerCheck() {
    const elem = this.elementForm.querySelector('[name=name]');

    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');

    //проверяем условие
    if (elem.value.length > 0 && elem.value.length < 51) {
      return true;
    }

    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.nameHint));
    return;
  },

  /**
   * Валидация поля ввода телефона, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  telContainerCheck() {
    const elem = this.elementForm.querySelector('[name=phone]');

    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');

    //проверяем условие
    if (elem.value.length === 11 && Number.isInteger(+elem.value)) {
      return true;
    }
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.telHint));

    return;
  },

  /**
   * Валидация поля ввода пароля, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  passContainerCheck() {
    const elem = this.elementForm.querySelector('[name=password]');
    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');
    //проверяем условие
    if (elem.value.length > 4 && elem.value.length < 51) {
      return true;
    }
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.passHint));

    return;
  },

  /**
   * Валидация поля повтора пароля, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @param {boolean} passIsTrue - Если пароль прошел валидацию, проверяем повтор пароля, иначе сразу подчеркиваем
   * @return {boolean} true если всё верно, false если нет
   */
  passConfirmContainerCheck(passIsTrue) {
    const elem = this.elementForm.querySelector('[name=passwordConfirm]');
    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');
    //проверяем верно ли введен пароль
    if (passIsTrue) {
      //получаем что введено в пароль
      const pass = this.elementForm.querySelector('[name=password]');
      //проверяем условие
      if (elem.value === pass.value) {
        return true;
      }
    }
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.passConfirmHint));
    return;
  },

  /**
   * Главная фунеция объекта
   * @param {object} event - событие которое произошло при нажатии на кнопку
   */
  mainCheck(event) {
    //проверяем имя
    let nameCheck = this.nameContainerCheck();
    //проверяем телефон
    let telCheck = this.telContainerCheck();
    //проверяем пароль
    let passCheck = this.passContainerCheck();
    //проверяем повтор пароля
    let passConfirmCheck = this.passConfirmContainerCheck(passCheck);

    //если все проверки верны заканчиваем функцию и продолжаем отправку формы, иначе останавливаем действие браузера по умолчанию
    if (nameCheck && telCheck &&
      passCheck && passConfirmCheck) {
      return;
    } else {
      event.preventDefault();

    }
  },
};

//вещаем слушателя событий на отправку формы
params.elementForm.addEventListener('submit', (event) => params.mainCheck(event));