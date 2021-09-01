// A. Количество равных максимальному

// Ограничение времени                   1 секунда
// Ограничение памяти                    64Mb
// Ввод                                  стандартный ввод или input.txt
// Вывод                                 стандартный вывод или output.txt
// Последовательность состоит из натуральных чисел и завершается числом 0. Всего 
// вводится не более 10000 чисел (не считая завершающего числа 0). Определите, 
// сколько элементов этой последовательности равны ее наибольшему элементу.

// Числа, следующие за числом 0, считывать не нужно.

// Формат ввода

// Вводится последовательность целых чисел, оканчивающаяся числом 0 (само число 
// 0 в последовательность не входит).

// Формат вывода

// Выведите ответ на задачу.

// Пример 1
// Ввод                    Вывод
// 1                       1
// 7
// 9
// 0

// Пример 2
// Ввод                    Вывод
// 1                       2
// 3
// 3
// 1
// 0

// Язык: Node.js 14.15.5


function count(data) {
  const numbers = data.toString().trim().split(/\s+/).map(Number);

  let maxNumber = numbers[0];
  let counter = 1;

  for (let i = 1; i < numbers.length; ++i) {
    if (numbers[i] > maxNumber) {
      maxNumber = numbers[i];
      counter = 1;
    } else if (numbers[i] === maxNumber) {
      ++counter;
    }
  }

  return counter;
}

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = count(fileContent);
fs.writeFileSync('output.txt', result + '');
