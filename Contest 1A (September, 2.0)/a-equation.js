// A. Сложное уравнение

// Ограничение времени                 1 секунда
// Ограничение памяти                  64Mb
// Ввод                                стандартный ввод или input.txt
// Вывод                               стандартный вывод или output.txt

// Решить в целых числах уравнение ( ax + b ) : ( cx + d ) = 0

// Формат ввода

// Вводятся 4 числа: a, b, c и d; c и d не равны нулю одновременно.

// Формат вывода

// Необходимо вывести все целочисленные решения, если их число конечно, “NO” 
// (без кавычек), если целочисленных решений нет, и “INF” (без кавычек), если их 
// бесконечно много.

// Пример 1
// Ввод                  Вывод
// 1                     NO
// 1
// 2
// 2

// Пример 2
// Ввод                  Вывод
// 2                     2
// -4
// 7
// 1

// Пример 3
// Ввод                  Вывод
// 35                    NO
// 14
// 11
// -3

// Язык: Node.js 14.15.5


function solve(data) {
  const [a, b, c, d] = data.toString().trim().split(/\s+/).map(Number);

  const answer = -b / a;

  if (c * -b / a === -d) return 'NO';
  else if (a === 0 && b === 0) return 'INF';
  else if (parseInt(answer) !== answer) return 'NO';
  else return answer.toString();
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result);
