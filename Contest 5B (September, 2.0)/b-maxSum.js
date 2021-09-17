// B. Максимальная сумма

// Ограничение времени               1 секунда
// Ограничение памяти                256Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// В этой задаче вам требуется найти непустой отрезок массива с максимальной 
// суммой.

// Формат ввода

// В первой строке входных данных записано единственное число n (1 ≤ n ≤ 3 * 
// 10^5) -  размер массива.
// Во второй строке записано n целых чисел ai (−10^9 ≤ ai ≤ 10^9) - сам массив.

// Формат вывода

// Выведите одно число - максимальную сумму на отрезке в данном массиве.

// Пример 1
// Ввод                Вывод
// 4                   10
// 1 2 3 4

// Пример 2
// Ввод                Вывод
// 4                   9
// 5 4 -10 4

// Язык: Node.js 14.15.5


function calcMaxSum(data) {
  data = data.toString().trim().split('\n');
  const numbers = data[1].trim().split(/\s+/).map(Number);

  let currentSum = numbers[0];
  let maxSum = currentSum;

  for (let next = 1; next < numbers.length; ++next) {
    if (currentSum <= 0) currentSum = numbers[next];
    else currentSum += numbers[next];

    maxSum = currentSum > maxSum ? currentSum : maxSum;
  }

  return maxSum;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = calcMaxSum(fileContent);

fs.writeFileSync('output.txt', result + '');
