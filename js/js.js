"use strict";

/**
 * Переводит температуру из цельсий в фаренгейты
 * @param {number} celsium Температура в цельсиях.
 * @return {number} Результат в фаренгейтах.
 */
function C2Fa(celsium) {
  return (9 / 5) * celsium + 32;
}

let Tc = +prompt('Введите темературу в Цельсиях: ');

alert(`${Tc} градусов в Цельсиях равно ${(C2Fa(Tc)).toFixed(2)} градусам в Фаренгейтах`);