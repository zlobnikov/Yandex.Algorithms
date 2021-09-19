// B. Номер левого и правого вхождения

// Ограничение времени                 2 секунды
// Ограничение памяти                  64Mb
// Ввод                                стандартный ввод или input.txt
// Вывод                               стандартный вывод или output.txt

// Требуется определить в заданном массиве номер самого левого и самого правого 
// элемента, равного искомому числу.

// Формат ввода

// В первой строке вводится одно натуральное число N, не превосходящее 10^5: 
// количество чисел в массиве. Во второй строке вводятся N натуральных чисел, не 
// превосходящих 10^9, каждое следующее не меньше предыдущего. В третьей строке 
// вводится количество искомых чисел M – натуральное число, не превосходящее 
// 10^6. В четвертой строке вводится M натуральных чисел, не превосходящих 10^9.

// Формат вывода

// Для каждого запроса выведите в отдельной строке через пробел два числа: номер 
// элемента самого левого и самого правого элементов массива, равных числу-
// запросу. Элементы массива нумеруются с единицы.Если в массиве нет такого 
// числа, выведите в соответствующей строке два нуля, разделенных пробелом.

// Пример 1
// Ввод
// 4
// 1 2 2 3
// 4
// 4 3 2 1

// Вывод
// 0 0
// 4 4
// 2 3
// 1 1

// Пример 2
// Ввод
// 10
// 1 2 3 4 5 6 7 7 8 9
// 10
// 7 3 3 1 3 7 9 7 7 10

// Вывод
// 7 8
// 3 3
// 3 3
// 1 1
// 3 3
// 7 8
// 10 10
// 7 8
// 7 8
// 0 0

// Пример 3
// Ввод
// 10
// 1 3 3 3 3 6 8 8 9 10
// 10
// 2 9 6 4 2 9 3 7 9 7

// Вывод
// 0 0
// 9 9
// 6 6
// 0 0
// 0 0
// 9 9
// 2 5
// 0 0
// 9 9
// 0 0

// Язык: Node.js 14.15.5


function getNumbers(data) {
  data = data.toString().trim().split('\n');
  const ns = [0].concat(data[1].split(/\s+/).map(Number));
  const ms = data[3].split(/\s+/).map(Number);

  const result = [];

  for (let i = 0; i < ms.length; ++i) {
    const m = ms[i];
    const left = getLeft(ns, m);
    const right = getRight(ns, m);

    result.push(left + ' ' + right);
  }

  return result.join('\n');
}

function getLeft(ns, m) {
  let left = 0;
  let right = ns.length - 1;

  while (left < right) {
    let medium = Math.floor((left + right) / 2);

    if (ns[medium] >= m) right = medium;
    else left = medium + 1;
  }

  return ns[left] === m ? left : 0;
}

function getRight(ns, m) {
  let left = 0;
  let right = ns.length - 1;

  while (left < right) {
    let medium = Math.ceil((left + right) / 2);

    if (ns[medium] > m) right = medium - 1;
    else left = medium;
  }

  return ns[left] === m ? left : 0;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getNumbers(fileContent);

fs.writeFileSync('output.txt', result);
