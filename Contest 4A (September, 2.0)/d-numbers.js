// D. Числа

// Ограничение времени                   1 секунда
// Ограничение памяти                    64Mb
// Ввод                                  стандартный ввод или input.txt
// Вывод                                 стандартный вывод или output.txt

// Саша и Катя учатся в начальной школе. Для изучения арифметики при этом 
// используются карточки, на которых написаны цифры (на каждой карточке написана 
// ровно одна цифра). Однажды они пришли на урок математики, и Саша, используя 
// все свои карточки, показал число A, а Катя показала число B. Учитель тогда 
// захотел дать им такую задачу, чтобы ответ на нее смогли показать и Саша, и 
// Катя, каждый используя только свои карточки. При этом учитель хочет, чтобы 
// искомое число было максимально возможным.

// Формат ввода

// Во входном файле записано два целых неотрицательных числа A и B (каждое число 
// в одной строке). Длина каждого из чисел не превосходит 100 000 цифр.

// Формат вывода

// Выведите одно число — максимальное целое число, которое можно составить 
// используя как цифры первого числа, так и цифры второго числа. Если же ни 
// одного такого числа составить нельзя, выведите -1.

// Пример 1
// Ввод                    Вывод
// 280138                  8810
// 798081

// Пример 2
// Ввод                    Вывод
// 123                     -1
// 456

// Язык: Node.js 14.15.5


function solve(data) {
  const [firstCards, secondCards] = data.toString()
    .trim()
    .split('\n')
    .map(line => line.split(''));

  const firstCardsCounts = {};

  for (let i = 0; i < firstCards.length; ++i) {
    const card = firstCards[i];

    if (!firstCardsCounts[card]) firstCardsCounts[card] = 0;
    ++firstCardsCounts[card];
  }

  const secondCardsCounts = {};

  for (let i = 0; i < secondCards.length; ++i) {
    const card = secondCards[i];

    if (!secondCardsCounts[card]) secondCardsCounts[card] = 0;
    ++secondCardsCounts[card];
  }

  const orderedCards = Object.keys(firstCardsCounts)
    .sort((a, b) => b - a);

  let result = [];

  for (let i = 0; i < orderedCards.length; ++i) {
    const card = orderedCards[i];
    const minCount = firstCardsCounts[card] <= secondCardsCounts[card]
      ? firstCardsCounts[card] : secondCardsCounts[card];

    for (let j = 0; j < minCount; ++j) {
      result.push(card);
    }
  }

  if (result.length && result[0] === '0') result = ['0'];

  return result.length ? result.join('') : '-1';
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
