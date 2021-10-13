// B. Точки и отрезки

// Ограничение времени               3 секунды
// Ограничение памяти                256Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// Дано n отрезков на числовой прямой и m точек на этой же прямой. Для каждой из 
// данных точек определите, скольким отрезкам они принадлежат. Точка x считается 
// принадлежащей отрезку с концами a и b, если выполняется двойное неравенство 
// min(a, b) ≤ x ≤ max(a, b).

// Формат ввода

// Первая строка содержит два целых числа n (1 ≤ n ≤ 105) – число отрезков и m 
// (1 ≤ m ≤ 10^5) – число точек. В следующих n строках по два целых числи ai и 
// bi – координаты концов соответствующего отрезка. В последней строке m целых 
// чисел – координаты точек. Все числа по модулю не превосходят 10^9

// Формат вывода

// В выходной файл выведите m чисел – для каждой точки количество отрезков, в 
// которых она содержится.

// Пример
// Ввод                Вывод
// 3 2                 2 0
// 0 5
// -3 2
// 7 10
// 1 6

// Язык: Node.js 14.15.5


function countSegments(data) {
  const source = data.toString().trim().split('\n');
  const [n, m] = source[0].trim().split(' ').map(Number);
  const segments = source.slice(1, n + 1).map(processSegment);
  const points = source[n + 1].split(' ').map(Number);

  let events = [];

  // if we have a lot of identical segments (test 3)
  let startEvents = {};
  let endEvents = {};

  for (let i = 0; i < n; ++i) {
      if (startEvents[segments[i][0]]) {
          ++startEvents[segments[i][0]];
      } else {
          events.push([segments[i][0], 1]);
          startEvents[segments[i][0]] = 1;
      }

      // if we have a lot of neighboring segments (test 4)
      while (segments[i + 1] !== undefined 
          && segments[i][1] === segments[i + 1][0] - 1) ++i;

      if (endEvents[segments[i][1]]) {
          ++endEvents[segments[i][1]];
      } else {
          events.push([segments[i][1], 3]);
          endEvents[segments[i][1]] = 1;
      }
  }

  for (let i = 0; i < m; ++i) {
      events.push([points[i], 2, i]);
  }

  events.sort(sortEvents);

  let currentSegments = 0;

  for (let i = 0; i < events.length; ++i) {
      if (events[i][1] === 1) {
          currentSegments += startEvents[events[i][0]];
      } else if (events[i][1] === 3) {
          currentSegments -= endEvents[events[i][0]];
   } else points[events[i][2]] = currentSegments;
  }

  return points;
}

function processSegment(s) {
  return s.split(' ').map(Number).sort((a, b) => a - b);
}

function sortEvents(a, b) {
  if (a[0] === b [0]) return a[1] - b[1]
  return a[0] - b[0];
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = countSegments(fileContent);

fs.writeFileSync('output.txt', result.join(' '));
