// B. Встречалось ли число раньше

// Ограничение времени               1 секунда
// Ограничение памяти                64Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// Во входной строке записана последовательность чисел через пробел. Для каждого 
// числа выведите слово YES (в отдельной строке), если это число ранее 
// встречалось в последовательности или NO, если не встречалось.

// Формат ввода

// Вводится список чисел. Все числа списка находятся на одной строке.

// Формат вывода

// Выведите ответ на задачу.

// Пример
// Ввод                Вывод
// 1 2 3 2 3 4         NO
//                     NO
//                     NO
//                     YES
//                     YES
//                     NO

// Язык: Node.js 14.15.5


function check(data) {
  const sequence = data.toString().trim().split(/\s+/);
  const storage = new Set();
  const result = [];

  sequence.forEach(elem => {
    if (storage.has(elem)) result.push('YES');
    else {
      result.push('NO');
      storage.add(elem);
    }
  });

  return result.join('\n');
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = check(fileContent);

fs.writeFileSync('output.txt', result + '');
