// D. Бусинки

// Ограничение времени                   2 секунды
// Ограничение памяти                    256Mb
// Ввод                                  стандартный ввод или input.txt
// Вывод                                 стандартный вывод или output.txt

// Маленький мальчик делает бусы. У него есть много пронумерованных бусинок. 
// Каждая бусинка имеет уникальный номер – целое число в диапазоне от 1 до N. Он 
// выкладывает все бусинки на полу и соединяет бусинки между собой произвольным 
// образом так, что замкнутых фигур не образуется. Каждая из бусинок при этом 
// оказывается соединенной с какой-либо другой бусинкой.

// Требуется определить, какое максимальное количество последовательно 
// соединенных бусинок присутствует в полученной фигуре.

// Формат ввода

// В первой строке – количество бусинок 1 ≤ N ≤ 2500. В последующих N-1 строках 
// по два целых числа – номера, соединенных бусинок.

// Формат вывода

// Вывести одно число – искомое количество бусинок.

// Пример 1
// Ввод                    Вывод
// 2                       2
// 1 2

// Пример 2
// Ввод                    Вывод
// 5                       3
// 2 1
// 2 3
// 2 4
// 2 5

// Пример 3
// Ввод                    Вывод
// 10                      10
// 1 2
// 2 3
// 3 4 
// 4 5
// 1 6
// 6 10
// 10 9
// 9 8
// 8 7

// Язык: Node.js 14.15.5


function countBeads(data) {
  data = data.toString().trim().split('\n').slice(1)
    .map(line => line.split(/\s+/));

  const connections = makeConnections(data);
  let deletedLeaves = 0;

  let leaves = getLeaves(connections);

  while (leaves.length) {
    for (let i = 0; i < leaves.length; ++i) {

      const leaf = leaves[i];
      const [neighbor] = [...connections[leaf]];

      if (connections[neighbor]) connections[neighbor].delete(leaf);
      delete connections[leaf];
    }

    deletedLeaves += 2;
    leaves = getLeaves(connections);
  }

  for (let i in connections) {
    ++deletedLeaves;
  }

  return deletedLeaves;
}

function makeConnections(data) {
  const connections = new Object();

  for (let i = 0; i < data.length; ++i) {
    const left = data[i][0];
    const right = data[i][1];

    if (!connections[left]) connections[left] = new Set();
    if (!connections[right]) connections[right] = new Set();

    connections[left].add(right);
    connections[right].add(left);
  }

  return connections;
}

function getLeaves(connections) {
  const leaves = [];

  for (let i in connections) {
    if (connections[i].size === 1) leaves.push(i);
  }

  return leaves;
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = countBeads(fileContent);

fs.writeFileSync('output.txt', result + '');
