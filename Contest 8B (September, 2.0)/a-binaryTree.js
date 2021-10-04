// A. Бинарное дерево (вставка, поиск, обход)

// Ограничение времени               1 секунда
// Ограничение памяти                64Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// Напишите программу, которая будет реализовывать действия в бинарном дереве 
// поиска «вставить» и «найти» (по значению). Программа должна обрабатывать 
// запросы трёх видов:

// ADD n — если указанного числа еще нет в дереве, вставлять его и выводить 
// слово «DONE», если уже есть — оставлять дерево как было и выводить слово 
// «ALREADY».

// SEARCH — следует выводить слово «YES» (если значение найдено в дереве) или 
// слово «NO» (если не найдено). Дерево при этом не меняется.

// PRINTTREE — выводить все дерево, обязательно используя алгоритм, указанный в 
// формате вывода результатов.

// Формат ввода

// В каждой строке входных данных записан один из запросов ADD n или SEARCH n 
// или PRINTTREE. Гарантируется, что запросы PRINTTREE будут вызываться только в 
// моменты, когда дерево не пустое. Общее количество запросов не превышает 1000, 
// из них не более 20 запросов PRINTTREE.

// Формат вывода

// Для каждого запроса выводите ответ на него. Для запросов ADD и SEARCH — 
// соответствующее слово в отдельной строке. На запрос PRINTTREE надо выводить 
// дерево, обязательно согласно такому алгоритму:

// 1) Распечатать левое поддерево
// 2) Вывести количество точек, равное глубине узла
// 3) Вывести значение ключа
// 4) Распечатать правое поддерево

// Пример
// Ввод                Вывод
// ADD 2               DONE
// ADD 3               DONE
// ADD 2               ALREADY
// SEARCH 2            YES
// ADD 5               DONE
// PRINTTREE           2
// SEARCH 7            .3
//                     ..5
//                     NO

// Язык: Node.js 14.15.5


function process(data) {
  const instructions = data.toString().trim().split('\n')
    .map(line => line.split(/\s+/));

  const tree = [];
  const result = [];

  for (let i = 0; i < instructions.length; ++i) {
    switch(instructions[i][0]) {

      case 'ADD':
        result.push(add(tree, +instructions[i][1], 0));
        break;

      case 'SEARCH':
        result.push(search(tree, +instructions[i][1], 0));
        break;

      case 'PRINTTREE':
        const nodes = [];
        print(tree, nodes, 0, 0);
        result.push(nodes.join('\n'));
    }
  }

  return result.join('\n');
}

function add(tree, node, index) {
  if (tree.length === 0) {
    tree.push([node, null, null]);

  } else if (node === tree[index][0]) {
    return 'ALREADY';

  } else if (node < tree[index][0]) {
    const left = tree[index][1];

    if (left === null) {
      tree.push([node, null, null]);
      tree[index][1] = tree.length - 1;

    } else {
      return add(tree, node, left);
    }

  } else if (node > tree[index][0]) {
    const right = tree[index][2];

    if (right === null) {
      tree.push([node, null, null]);
      tree[index][2] = tree.length - 1;

    } else {
      return add(tree, node, right);
    }
  }

  return 'DONE';
}

function search(tree, node, index) {
  if (tree.length === 0) return 'NO';
  else if (node === tree[index][0]) return 'YES';

  else if (node < tree[index][0]) {
    const left = tree[index][1];

    if (left === null) return 'NO';
    else return search(tree, node, left)

  } else if (node > tree[index][0]) {
    const right = tree[index][2];

    if (right === null) return 'NO';
    else return search(tree, node, right);
  }
}

function print(tree, nodes, index, depth) {
  if (tree[index][1] !== null) print(tree, nodes, tree[index][1], depth + 1);
  nodes.push('.'.repeat(depth) + tree[index][0]);
  if (tree[index][2] !== null) print(tree, nodes, tree[index][2], depth + 1);
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = process(fileContent);

fs.writeFileSync('output.txt', result);
