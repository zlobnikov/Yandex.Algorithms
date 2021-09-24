// A. Закраска прямой

// Ограничение времени                 3 секунды
// Ограничение памяти                  64Mb
// Ввод                                стандартный ввод или input.txt
// Вывод                               стандартный вывод или output.txt

// На числовой прямой окрасили N отрезков. Известны координаты левого и правого 
// концов каждого отрезка (Li и Ri). Найти длину окрашенной части числовой 
// прямой.

// Формат ввода

// В первой строке находится число N, в следующих N строках - пары Li и Ri. Li и 
// Ri - целые, -10^9 ≤ Li ≤ Ri ≤ 10^9, 1 ≤ N ≤ 15 000

// Формат вывода

// Вывести одно число - длину окрашенной части прямой.

// Пример 1
// Ввод                  Вывод
// 1                     10
// 10 20

// Пример 2
// Ввод                  Вывод
// 1                     0
// 10 10

// Пример 3
// Ввод                  Вывод
// 2                     30
// 10 20
// 20 40

// Язык: Node.js 14.15.5


function getLength(data) {
  data = data.toString().trim().split('\n');
  const n = +data[0];
  const segments = data.slice(1).map(line => line.split(/\s+/).map(Number));

  const events = [];

  for (let i = 0; i < n; ++i) {
    events.push([segments[i][0], -1]);
    events.push([segments[i][1], 1]);
  }

  events.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    else return a[0] - b[0];
  });

  let currentSegmentsCount = 0;
  let lengthSum = 0;
  let start = null;

  for (let i = 0; i < events.length; ++i) {
    if (currentSegmentsCount === 0) start = events[i][0];

    if (events[i][1] === -1) ++currentSegmentsCount;
    else if (events[i][1] === 1) --currentSegmentsCount;

    if (currentSegmentsCount === 0) lengthSum += events[i][0] - start;
  }

  return lengthSum;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getLength(fileContent);

fs.writeFileSync('output.txt', result + '');
