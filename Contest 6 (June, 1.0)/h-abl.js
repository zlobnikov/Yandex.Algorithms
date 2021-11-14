// H. АВЛ-сбалансированность

//                             Все языки         Python 3.6
// Ограничение времени         2 секунды         4 секунды
// Ограничение памяти          64Mb          256Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Дерево называется АВЛ-сбалансированным, если для любой его вершины высота 
// левого и правого поддерева для этой вершины различаются не более чем на 1.

// Формат ввода

// Вводится последовательность целых чисел, оканчивающаяся нулем. Сам ноль в 
// последовательность не входит. Постройте дерево, соответствующее данной 
// последовательности.

// Формат вывода

// Определите, является ли дерево сбалансированным, выведите слово YES или NO.

// Пример
// Ввод                      Вывод
// 7 3 2 1 9 5 4 6 8 0       YES

// Язык: Node.js 14.15.5

function solve(data) {
  const sequence = data.toString().trim().split(/\s+/).map(Number);

  if (sequence[0] === 0) return 'YES';

  const tree = [[sequence[0], null, null]]

  let i = 1; 
  while (sequence[i] !== 0) {
      addElement(tree, 0, sequence[i++]);
  }

  if (checkHeight(tree, 0, 0)) return 'YES';
  else return 'NO';
}

function addElement(tree, root, element) {
    if (element < tree[root][0]) {
        let left = tree[root][1];

        if (tree[left]) {
            return addElement(tree, left, element);

        } else {
            left = tree.length;
            tree[root][1] = left;
            tree[left] = [element, null, null];
        }

    } else if (element > tree[root][0]) {
        let right = tree[root][2];

        if (tree[right]) {
            return addElement(tree, right, element);

        } else {
            right = tree.length;
            tree[root][2] = right;
            tree[right] = [element, null, null];
        }

    } else if (element === tree[root][0]) {
      //
    }
}

function checkHeight(tree, root, height) {
  if (root === null) return height;

  const leftChildIndex = tree[root][1];
  const rightChildIndex = tree[root][2];

  const leftHeight = checkHeight(tree, leftChildIndex, height + 1);
  const rightHeight = checkHeight(tree, rightChildIndex, height + 1);

  if (Math.abs(leftHeight - rightHeight) > 1
    || leftHeight === undefined
    || rightHeight === undefined
  ) { return; }

  else return leftHeight >= rightHeight ? leftHeight : rightHeight;
}

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = solve(fileContent);

fs.writeFileSync('output.txt', result);
