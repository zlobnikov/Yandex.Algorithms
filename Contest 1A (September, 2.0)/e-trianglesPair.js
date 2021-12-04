// E. Another Pair of Triangles

// Ограничение времени               2 секунды
// Ограничение памяти                512Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// Среди треугольников периметра P с целыми длинами сторон найдите треугольник 
// наибольшей и наименьшей ненулевой площади.

// Формат ввода

// Входные данные содержат одно целое число P — периметр треугольника (3 ≤ P ≤ 
// 10^9).

// Формат вывода

// В первой строке выведите три целых числа — длины сторон треугольника с 
// заданным периметром и наибольшей площадью. Во второй сторке выведите три 
// целых числа — длины сторон треугольника с заданным периметром и наименьшей 
// ненулевой площадью. Если решений несколько, выведите любое. Если 
// целочисленных треугольников заданного периметра не существует, выведите -1.

// Пример 1
// Ввод                Вывод
// 3                   1 1 1
//                     1 1 1

// Пример 2
// Ввод                Вывод
// 4                   -1

// Язык: Node.js 14.15.5


function solve(data) {
  const perimeter = Number(data.toString());

  if (perimeter === 4) return '-1';

  const maxTriangle = [Math.floor(perimeter / 3)];
  maxTriangle.push(Math.floor((perimeter - maxTriangle[0]) / 2));
  maxTriangle.push(perimeter - maxTriangle[0] - maxTriangle[1]);

  const minTriangle = [perimeter % 2 ? 1 : 2];
  minTriangle.push((perimeter - minTriangle[0]) / 2);
  minTriangle.push(minTriangle[1]);

  return `${maxTriangle.join(' ')}\n${minTriangle.join(' ')}`;
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result);
