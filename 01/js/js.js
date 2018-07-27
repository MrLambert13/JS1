"use strict";

/**
 * Переводит температуру из цельсий в фаренгейты
 * @param {number} celsium Температура в цельсиях.
 * @return {number} Результат в фаренгейтах.
 */
function C2Fa(celsium) {
  return (9 / 5) * celsium + 32;
}

/**
 * Обеспечивает ввод числа
 * @param {string} Msg Сообщение полюзователю что именно он вводит
 * @param {number} Numb_length количество цифр в числе (если необходимо)
 * @return {number} Число которое ввел пользователь*/
function inpNumb(Msg, Numb_length) {
  let result;

  if (Numb_length > 0) {
    do {
      result = prompt(Msg);
    } while (Number.isNaN(+result) || String(result).length !== Numb_length);
  } else {
    do {
      result = prompt(Msg);
    } while (Number.isNaN(+result));
  }

  return +result;
}

/**
 * Программа спрашивает у пользователя температуру в градусах по Цельсию.
 * Используя alert программа выводит данную температуру в градусах по Фаренгейту
 */
function work1() {
  let Tc = inpNumb('Введите темературу в Цельсиях: ');

  alert(`${Tc} градус(а/ов) в Цельсиях равно ${(C2Fa(Tc)).toFixed(2)} градусам в Фаренгейтах`);
}

/**
 * Объявить две переменные: admin и name. Записать в name строку "Василий".
 * Скопировать значение из name в admin. Вывести в консоль переменную admin (должно вывести "Василий").
 */
function work2() {
  let name = 'Василий', admin = name;
  console.log(admin);
}

/**
 * Суммирует диапазон чисел в массиве
 * @param {array} arr Массив из которого будут браться числа
 * @param {number} first номер элемента с которого начинаем суммировать
 * @param {number} last номер элемента по который, включительно, будем суммировать
 * @return {number} Результат суммы чисел
 */
function sumFromArr(arr, first, last) {
  let result = 0;

  for (let i = first - 1; i < last; i++) {
    result += +arr[i];
  }

  return result;
}

function work3() {
  console.log(typeof (10 + 10 + "10")); //конкатенация со строкой "10" превращает всё вс троку
  console.log(typeof (10 + "10" + 10)); // аналогично предыдущему (от перестановки мест слагаемых...=) )
  console.log(typeof (10 + 10 + +"10")); // унарный плюс перед "10" преобразует значение справа от себя в число
  console.log(typeof (10 / "0")); // деление воспринимается как операция с числами поэтому "0" преобразовалось в число
  console.log(typeof (10 / +"2,5")); //аналогично третьему примеру, унарный плюс с приоритетом 16 выполнился раньше
                                     // деления (приоритет 14), поэтому к моменту деления с обоих сторон от слэша уже
                                     // были числа
}

/**
 * Пользователь, с помощью команды prompt, вводит номер билета - 6 цифр. Программа определяет является ли счастливым
 * данный билетик и выводит соответстующее сообщение в консоль. Счастливый билет - билет, у которого сумма первых трех
 * цифр равна сумме последних трех цифр номера билета.*/
function work5() {
  let maxdigit = 6, tick_numb = inpNumb('Введите номер билета (6 цифр)', maxdigit);
  let digitarr = [];

  for (let i = 0; i < maxdigit ; i++) {
    digitarr [i] = +String(tick_numb)[i];
  }

  sumFromArr(digitarr, 1, 3) === sumFromArr(digitarr, 4, 6)
      ? alert('Поздравляем, у вас счастливый билет!')
      : alert('Увы, ваш билет не счастливый. Попробуйте ещё раз.');

  // console.log(sumFromArr(digitarr, 1, 3));
  // console.log(sumFromArr(digitarr, 4, 6));
}