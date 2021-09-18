// A. Быстрый поиск в массиве

// Ограничение времени                 1 секунда
// Ограничение памяти                  64Mb
// Ввод                                стандартный ввод или input.txt
// Вывод                               стандартный вывод или output.txt

// Дан массив из N целых чисел. Все числа от −10^9 до 10^9. Нужно уметь отвечать 
// на запросы вида “Cколько чисел имеют значения от L до R?”.

// Формат ввода

// Число N (1 ≤ N ≤ 10^5). Далее N целых чисел. Затем число запросов K (1 ≤ K ≤ 
// 10^5). Далее K пар чисел L, R (−10^9 ≤ L ≤ R ≤ 10^9) — собственно запросы.

// Формат вывода

// Выведите K чисел — ответы на запросы.

// Пример
// Ввод                  Вывод
// 5                     5 2 2 0 
// 10 1 10 3 4
// 4
// 1 10
// 2 9
// 3 4
// 2 2

// Язык: Node.js 14.15.5


function countNumbers(data) {
  data = data.toString().trim().split('\n');
  const numbers = data[1].trim().split(/\s+/).map(Number);
  const sections = data.slice(3).map(line => line.split(/\s+/).map(Number));

  numbers.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sections.length; ++i) {
    const [left, right] = sections[i];

    if (left > numbers[numbers.length - 1] || right < numbers[0]) {
      result.push(0);

    } else {
      const count = getFinish(numbers, right)- getStart(numbers, left) + 1;
      result.push(count > 0 ? count : 0);
    }
  }

  return result.join(' ');
}

function getStart(numbers, n) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    let medium = Math.floor((left + right) / 2);

    if (numbers[medium] >= n) right = medium;
    else left = medium + 1;
  }

  return left;
}

function getFinish(numbers, n) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    let medium = Math.ceil((left + right) / 2);

    if (numbers[medium] > n) right = medium - 1;
    else left = medium;
  }

  return left;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = countNumbers(fileContent);

fs.writeFileSync('output.txt', result);
