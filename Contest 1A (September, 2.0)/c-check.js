// C. Проверьте правильность ситуации

// Ограничение времени             1 секунда
// Ограничение памяти              64Mb
// Ввод                            стандартный ввод или input.txt
// Вывод                           стандартный вывод или output.txt

// Напишите программу, которая по изображению поля для игры в «Крестики-нолики» 
// определит, могла ли такая ситуация возникнуть в результате игры с 
// соблюдением всех правил.

// Напомним, что игра в «Крестики-нолики» ведется на поле 3*3. Два игрока ходят 
// по очереди. Первый ставит крестик, а второй – нолик. Ставить крестик и нолик 
// разрешается в любую еще не занятую клетку поля. Когда один из игроков 
// поставит три своих знака в одной горизонтали, вертикали или диагонали, или 
// когда все клетки поля окажутся заняты, игра заканчивается.

// Формат ввода

// Вводится три строки по три числа в каждой, описывающих игровое поле. Число 0 
// обозначает пустую клетку, 1 – крестик, 2 – нолик. Числа в строке разделяются 
// пробелами.

// Формат вывода

// Требуется вывести слово YES, если указанная ситуация могла возникнуть в ходе 
// игры, и NO в противном случае.

// Пример 1
// Ввод              Вывод
// 1 1 1             NO
// 1 1 1
// 1 1 1

// Пример 2
// Ввод              Вывод
// 2 1 1             YES
// 1 1 2
// 2 2 1

// Пример 3
// Ввод              Вывод
// 1 1 1             YES
// 2 0 2
// 0 0 0

// Пример 4
// Ввод              Вывод
// 0 0 0             YES
// 0 1 0
// 0 0 0

// Язык: Node.js 14.15.5


function checkField(data) {
  const field = data.toString().trim().split(/\s+/);

  const diff = calcDiff(field);
  const winner = findWinner(field);

  if (!checkWins(field)
    || (winner === '111' && diff !== 1)
    ||  (winner === '222' && diff !== 0)
   ) return 'NO';

  if (diff === 0 || diff === 1) return 'YES';

  return 'NO';
}

function calcDiff(field) {
  const crossesCount = field.filter(v => v === '1').length;
  const zerosCount = field.filter(v => v === '2').length;

  return crossesCount - zerosCount;
}

function checkWins(field) {
  let winsCount = 0;


  for (let i = 0; i < 3; ++i) {
    const row = field.slice(i * 3, i * 3 + 3).join('');
    if (row === '111' || row === '222') ++winsCount;
  }

  if (winsCount > 1) return false;
  else winsCount = 0;

  for (let i = 0; i < 3; ++i) {
    const column = [field[i], field[i + 3], field[i + 6]].join('');
    if (column === '111' || column === '222') ++winsCount;
  }

  return winsCount <= 1;
}

function findWinner(field) {
  let cellsSet;

  for (let i = 0; i < 3; ++i) {
    cellsSet = field.slice(i * 3, i * 3 + 3).join('');
    if (cellsSet === '111' || cellsSet === '222') return cellsSet;
  }

  for (let i = 0; i < 3; ++i) {
    cellsSet = [field[i], field[i + 3], field[i + 6]].join('');
    if (cellsSet === '111' || cellsSet === '222') return cellsSet;
  }

  cellsSet = [field[0], field[4], field[8]].join('');
  if (cellsSet === '111' || cellsSet === '222') return cellsSet;

  cellsSet = [field[2], field[4], field[6]].join('');
  if (cellsSet === '111' || cellsSet === '222') return cellsSet;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = checkField(fileContent);

fs.writeFileSync('output.txt', result);
