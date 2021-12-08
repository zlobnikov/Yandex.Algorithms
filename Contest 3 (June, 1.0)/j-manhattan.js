// J. Пробежки по Манхэттену

// Ограничение времени           2 секунды
// Ограничение памяти            64Mb
// Ввод                          стандартный ввод или input.txt
// Вывод                         стандартный вывод или output.txt

// Дороги Нью-Манхэттена устроены следующим образом. С юга на север через каждые 
// сто метров проходит авеню, с запада на восток через каждые сто метров 
// проходит улица. Авеню и улицы нумеруются целыми числами. Меньшие номера 
// соответствуют западным авеню и южным улицам. Таким образом, можно построить 
// прямоугольную систему координат так, чтобы точка (x, y) лежала на пересечении 
// x-ой авеню и y-ой улицы. Легко заметить, что для того, чтобы в Нью-Манхэттене 
// дойти от точки (x1, y1) до точки (x2, y2) нужно пройти |x2 − x1| + |y2 − y1| 
// кварталов. Эта величина называется манхэттенским расстоянием между точками 
// (x1, y1) и (x2, y2).

// Миша живет в Нью-Манхэттене и каждое утро делает пробежку по городу. Он 
// выбегает из своего дома, который находится в точке (0, 0) и бежит по 
// случайному маршруту. Каждую минуту Миша либо остается на том же перекрестке, 
// что и минуту назад, или перемещается на один квартал в любом направлении. 
// Чтобы не заблудиться Миша берет с собой навигатор, который каждые t минут 
// говорит Мише, в какой точке он находится. К сожалению, навигатор показывает 
// не точное положение Миши, он может показать любую из точек, манхэттенское 
// расстояние от которых до Миши не превышает d.

// Через t × n минут от начала пробежки, получив n-е сообщение от навигатора, 
// Миша решил, что пора бежать домой. Для этого он хочет понять, в каких точках 
// он может находиться. Помогите Мише сделать это.

// Формат ввода

// Первая строка входного файла содержит числа t, d и n (1 ≤ t ≤ 100, 1 ≤ d ≤ 
// 100, 1 ≤ n ≤ 100).

// Далее n строк описывают данные, полученные от навигатора. Строка номер i 
// содержит числа xi и yi — данные, полученные от навигатора через ti минут от 
// начала пробежки.

// Формат вывода

// В первой строке выходного файла выведите число m — число точек, в которых 
// может находиться Миша. Далее выведите m пар чисел — координаты точек. Точки 
// можно вывести в произвольном порядке.

// Гарантируется, что навигатор исправен и что существует по крайней мере одна 
// точка, в которой может находиться Миша.

// Пример 1
// Ввод
// 2 1 5
// 0 1
// -2 1
// -2 3
// 0 3
// 2 5

// Вывод
// 2
// 1 5
// 2 4

// Пример 2
// Ввод
// 1 1 1
// 0 0

// Вывод
// 5
// -1 0
// 0 -1
// 0 0
// 0 1
// 1 0

// Пример 3
// Ввод
// 1 10 1
// 0 0

// Вывод
// 5
// -1 0
// 0 -1
// 0 0
// 0 1
// 1 0

// Язык: Node.js 14.15.5


function solve(data) {
  data = data.toString().trim().split('\n')
    .map(line => line.split(/\s+/)
      .map(Number));

  const [t, d, n] = data[0];
  const navCoords = data.slice(1);

  // x - y diagonals
  let leftToUp = 0;
  let rightToUp = 0;

  // x + y diagonals
  let leftToBottom = 0;
  let rightToBottom = 0;

  navCoords.forEach(navXY => {
    leftToUp -= t;
    rightToUp += t;

    leftToBottom -= t;
    rightToBottom += t;

    const [navX, navY] = navXY;

    const navLeftToUp = navX - navY - d;
    const navRightToUp = navX - navY + d;

    const navLeftToBottom = navX + navY - d;
    const navRightToBottom = navX + navY + d;

    leftToUp = leftToUp > navLeftToUp ? leftToUp : navLeftToUp;
    rightToUp = rightToUp < navRightToUp ? rightToUp : navRightToUp;

    leftToBottom = leftToBottom > navLeftToBottom
      ? leftToBottom : navLeftToBottom;
    rightToBottom = rightToBottom < navRightToBottom
      ? rightToBottom : navRightToBottom;
  });

  const possibleCoords = [];

  for (let toUp = leftToUp; toUp <= rightToUp; ++toUp) {
    for (let toBottom = leftToBottom; toBottom <= rightToBottom; ++toBottom) {
      const x = (toUp + toBottom) / 2;
      const y = x - toUp;

      if (parseInt(x) === x) possibleCoords.push(`${x} ${y}`);
    }
  }

  return `${possibleCoords.length}\n${possibleCoords.join('\n')}`;
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
