// A. Высота дерева

//                                 Все языки           Python 3.6
// Ограничение времени             2 секунды           4 секунды
// Ограничение памяти              64Mb                256Mb
// Ввод                            стандартный ввод или input.txt
// Вывод                           стандартный вывод или output.txt

// Реализуйте бинарное дерево поиска для целых чисел. Программа получает на вход 
// последовательность целых чисел и строит из них дерево. Элементы в деревья 
// добавляются в соответствии с результатом поиска их места. Если элемент уже 
// существует в дереве, добавлять его не надо. Балансировка дерева не 
// производится.

// Формат ввода

// На вход программа получает последовательность натуральных чисел. 
// Последовательность завершается числом 0, которое означает конец ввода, и 
// добавлять его в дерево не надо.

// Формат вывода

// Выведите единственное число – высоту получившегося дерева.

// Пример
// Ввод                        Вывод
// 7 3 2 1 9 5 4 6 8 0         4

// Язык: Node.js 14.15.5


function getHeight(data) {
    const sequence = data.toString().trim().split(' ').map(Number);

    if (sequence[0] === 0) return 0;

    let tree = [[sequence[0], null, null]]
    let height = 1;
    let i = 1; 

    while (sequence[i] !== 0) {
        let currentHeight = addElement(tree, 0, 1, sequence[i]);
        if (currentHeight > height) height = currentHeight;
        ++i;
    }

    return height;
}

function addElement(tree, root, height, element) {
    if (element === tree[root][0]) return height;

    ++height;

    if (element < tree[root][0]) {
        let left = tree[root][1];

        if (tree[left]) {
            return addElement(tree, left, height, element);
        } else {
            left = tree.length;
            tree[root][1] = left;
            tree[left] = [element, null, null];
            return height;
        }

    } else {
        let right = tree[root][2];

        if (tree[right]) {
            return addElement(tree, right, height, element);
        } else {
            right = tree.length;
            tree[root][2] = right;
            tree[right] = [element, null, null];
            return height;
        }
    }
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getHeight(fileContent);

fs.writeFileSync('output.txt', result + '');
