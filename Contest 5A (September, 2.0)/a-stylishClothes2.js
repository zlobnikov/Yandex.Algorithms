// A. Стильная одежда 2

// Ограничение времени               2 секунды
// Ограничение памяти                256Mb
// Ввод                стандартный ввод или input.txt
// Вывод               стандартный вывод или output.txt

// Глеб обожает шоппинг. Как-то раз он загорелся идеей подобрать себе кепку, 
// майку, штаны и ботинки так, чтобы выглядеть в них максимально стильно. В 
// понимании Глеба стильность одежды тем больше, чем меньше разница в цвете 
// элементов его одежды.

// В наличии имеется N1 кепок, N2 маек, N3 штанов и N4 пар ботинок (1 ≤ Ni ≤ 
// 100 000). Про каждый элемент одежды известен его цвет (целое число от 1 до 
// 100 000). Комплект одежды — это одна кепка, майка, штаны и одна пара ботинок. 
// Каждый комплект характеризуется максимальной разницей между любыми двумя его 
// элементами. Помогите Глебу выбрать максимально стильный комплект, то есть 
// комплект с минимальной разницей цветов.

// Формат ввода

// Для каждого типа одежды i (i = 1, 2, 3, 4) сначала вводится количество Ni 
// элементов одежды этого типа, далее в следующей строке — последовательность из 
// Ni целых чисел, описывающих цвета элементов. Все четыре типа подаются на вход 
// последовательно, начиная с кепок и заканчивая ботинками. Все вводимые числа 
// целые, положительные и не превосходят 100 000.

// Формат вывода

// Выведите четыре целых числа — цвета соответственно для кепки, майки, штанов и 
// ботинок, которые должен выбрать Глеб из имеющихся для того, чтобы выглядеть 
// наиболее стильно. Если ответов несколько, выведите любой.

// Пример 1
// Ввод                Вывод
// 3                   3 3 3 3 
// 1 2 3
// 2
// 1 3
// 2
// 3 4
// 2
// 2 3

// Пример 2
// Ввод                Вывод
// 1                   5 6 9 20
// 5
// 4
// 3 6 7 10
// 4
// 18 3 9 11
// 1
// 20

// Язык: Node.js 14.15.5


function  solve(data) {
  const [n1, array1, n2, array2, n3, array3, n4, array4] =
    data.toString().trim().split('\n')
      .map(line => line.split(/\s+/)
        .map(Number)
        .sort((a, b) => a - b));

  const pointers = [
    [array1, 0, array1[0], n1 - 1, 0],
    [array2, 0, array2[0], n2 - 1, 1],
    [array3, 0, array3[0], n3 - 1, 2],
    [array4, 0, array4[0], n4 - 1, 3],
  ].sort((a, b) => a[2] - b[2]);

  let min = pointers[0];
  let max = pointers[3];

  let minDiff = max[2] - min[2];

  const state = {};
  getState(pointers, state);

  while (min[1] < min[3]) {
    let currentIndex = min[1];
    ++currentIndex;
    min[1] = currentIndex;

    const currentValue = min[0][currentIndex];
    min[2] = currentValue;

    pointers.sort((a, b) => a[2] - b[2]);
    min = pointers[0];
    max = pointers[3];

    const currentDiff = max[2] - min[2];

    if (currentDiff < minDiff) {
      minDiff = currentDiff;
      getState(pointers, state);
    }
  }

  return Object.values(state).join(' ');
}

function getState(from, to) {
  from.forEach(array => {
    const arrayIndex = array[4];
    const currentValue = array[2];

    to[arrayIndex] = currentValue;
  });
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
