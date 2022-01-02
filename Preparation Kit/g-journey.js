// G. Интересное путешествие

// Ограничение времени           1 секунда
// Ограничение памяти            64Mb
// Ввод                          стандартный ввод или input.txt
// Вывод                         стандартный вывод или output.txt

// Не секрет, что некоторые программисты очень любят путешествовать. Хорошо всем 
// известный программист Петя тоже очень любит путешествовать, посещать музеи и 
// осматривать достопримечательности других городов.

// Для перемещений между из города в город он предпочитает использовать машину. 
// При этом он заправляется только на станциях в городах, но не на станциях по 
// пути. Поэтому он очень аккуратно выбирает маршруты, чтобы машина не заглохла 
// в дороге. А ещё Петя очень важный член команды, поэтому он не может себе 
// позволить путешествовать слишком долго. Он решил написать программу, которая 
// поможет ему с выбором очередного путешествия. Но так как сейчас у него 
// слишком много других задач, он попросил вас помочь ему.

// Расстояние между двумя городами считается как сумма модулей разности по 
// каждой из координат. Дороги есть между всеми парами городов.

// Формат ввода

// В первой строке входных данных записано количество городов n (2 ≤ n ≤ 1000). 
// В следующих n строках даны два целых числа: координаты каждого города, не 
// превосходящие по модулю миллиарда. Все города пронумерованы числами от 1 до n 
// в порядке записи во входных данных.

// В следующей строке записано целое положительное число k, не превосходящее 
// двух миллиардов, — максимальное расстояние между городами, которое Петя может 
// преодолеть без дозаправки машины.

// В последней строке записаны два различных числа — номер города, откуда едет 
// Петя, и номер города, куда он едет.

// Формат вывода

// Если существуют пути, удовлетворяющие описанным выше условиям, то выведите 
// минимальное количество дорог, которое нужно проехать, чтобы попасть из 
// начальной точки маршрута в конечную. Если пути не существует, выведите -1.

// Пример 1
// Ввод            Вывод
// 7               2
// 0 0
// 0 2
// 2 2
// 0 -2
// 2 -2
// 2 -1
// 2 1
// 2
// 1 3

// Пример 2
// Ввод            Вывод
// 4               1
// 0 0
// 1 0
// 0 1
// 1 1
// 2
// 1 4

// Пример 3
// Ввод            Вывод
// 4               -1
// 0 0
// 2 0
// 0 2
// 2 2
// 1
// 1 4

// Язык: Node.js 14.15.5


function solve(data) {
  data = data.trim().split('\n');

  const n = Number(data[0]);
  const names = new Set(data.slice(1, n + 1));
  const maxDistance = Number(data[n + 1]);

  const coords = {};
  for (let name of names) {
    const [x, y] = name.split(/\s+/);
    coords[name] = [x, y];
  }

  const [start, finish] = data[n + 2].split(/\s+/);
  const startTown = data[start];
  const finishTown = data[finish];

  let nextStep = [new Set([startTown])];
  let stepsCount = 0;
  names.delete(startTown);

  while (nextStep[stepsCount].size) {
    const prevStepsCount = stepsCount;
    ++stepsCount;
    nextStep.push(new Set());

    for (let from of nextStep[prevStepsCount]) {
      const [fromX, fromY] = coords[from];

      for (let to of names) {
        const [toX, toY] = coords[to];

        if (Math.abs(toX - fromX) + Math.abs(toY - fromY) <= maxDistance) {
          if (to === finishTown) return stepsCount;

          nextStep[stepsCount].add(to);
        }
      }
    }

    for (let town of nextStep[stepsCount]) {
      names.delete(town);
    }
  }

  return -1;
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
