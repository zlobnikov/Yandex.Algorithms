// A. Палиндром

// Ограничение времени               1 секунда
// Ограничение памяти                64Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// Палиндром - это строка, которая читается одинаково как справа налево, так и 
// слева направо.

// На вход программы поступает набор больших латинских букв (не обязательно 
// различных). Разрешается переставлять буквы, а также удалять некоторые буквы. 
// Требуется из данных букв по указанным правилам составить палиндром наибольшей 
// длины, а если таких палиндромов несколько, то выбрать первый из них в 
// алфавитном порядке.

// Формат ввода

// В первой строке входных данных содержится число N (1 ≤ N ≤ 100000). Во второй 
// строке задается последовательность из N больших латинских букв (буквы 
// записаны без пробелов).

// Формат вывода

// В единственной строке выходных данных выдайте искомый палиндром.

// Пример 1
// Ввод                Вывод
// 3                   ABA
// AAB

// Пример 2
// Ввод                Вывод
// 6                   AQZZQA
// QAZQAZ

// Пример 3
// Ввод                Вывод
// 6                   A
// ABCDEF

// Язык: Node.js 14.15.5


function solve(data) {
  const letters = data.toString().trim().split('\n')[1].split('');

  const lettersCount = {};

  for (let i = 0; i < letters.length; ++i) {
    const letter = letters[i];

    if (!lettersCount[letter]) lettersCount[letter] = 0;
    ++lettersCount[letter];
  }

  const uniqueLetters = [...new Set(letters)].sort();
  let centralLetter = '';
  const orderedLetters = [];

  for (let i = 0; i < uniqueLetters.length; ++i) {
    const letter = uniqueLetters[i];
    const count = lettersCount[letter];

    if (!centralLetter && count % 2) centralLetter = letter;

    for (let j = 0; j < (count - count % 2) / 2; ++j) {
      orderedLetters.push(letter);
    }
  }

  return (
    orderedLetters.join('') +
    centralLetter +
    orderedLetters.reverse().join('')
  );
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
