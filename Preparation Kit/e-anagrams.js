// E. Анаграммы

// Ограничение времени               1 секунда
// Ограничение памяти                20Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// Даны две строки, состоящие из строчных латинских букв. Требуется определить, 
// являются ли эти строки анаграммами, т. е. отличаются ли они только порядком 
// следования символов.

// Формат ввода

// Входной файл содержит две строки строчных латинских символов, каждая не 
// длиннее 100 000 символов. Строки разделяются символом перевода строки.

// Формат вывода

// Выходной файл должен содержать единицу, если строки являются анаграммами, и 
// ноль в противном случае.

// Пример 1
// Ввод                Вывод
// qiu                 1
// iuq

// Пример 2
// Ввод                Вывод
// zprl                0
// zprc

// Язык: Node.js 14.15.5


function solve(data) {
  const [first, second] = data.toString().split('\n').map(line => line.trim());

  if (first.length !== second.length) return 0;

  const letters = {};

  for (let i = 0; i < first.length; ++i) {
    const char = first[i];

    if (!letters[char]) letters[char] = 0;
    ++letters[char];
  }

  for (let i = 0; i < second.length; ++i) {
    const char = second[i];

    if (letters[char] > 1) --letters[char];
    else if (letters[char] === 1) delete letters[char];
  }

  return Object.keys(letters).length ? 0 : 1;
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
