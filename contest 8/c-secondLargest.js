// C. Второй максимум

//                         Все языки           Python 3.6
// Ограничение времени     2 секунды           4 секунды
// Ограничение памяти      64Mb                256Mb
// Ввод                    стандартный ввод или input.txt
// Вывод                   стандартный вывод или output.txt

// Выведите второй по величине элемент в построенном дереве. Гарантируется, что 
// такой найдется.

// Формат ввода

// Дана последовательность целых чисел, оканчивающаяся нулем. Сам ноль в 
// последовательность не входит.

// Формат вывода

// Выведите ответ на задачу.

// Пример
// Ввод                        Вывод
// 7 3 2 1 9 5 4 6 8 0         8

// Язык: Node.js 14.15.5


function getSecondLargest(data) {
    const sequence = data.toString().trim().split(' ').map(Number);

    let tree = [[sequence[0], null, null, null]];
    let i = 1;

    while (sequence[i] !== 0) {
        addNode(tree, 0, sequence[i++]);
    }

    const largest = getLargest(tree, 0);
    const leftChild = tree[largest][1];

    if (leftChild === null) {
        const parent = tree[largest][3];
        return tree[parent][0];

    } else {
        const secondLargest = getLargest(tree, leftChild);
        return tree[secondLargest][0];
    }
}

function addNode(tree, root, element) {
    if (element < tree[root][0]) {
        let left = tree[root][1];

        if (left !== null) {
            addNode(tree, left, element);

        } else {
            left = tree.length;
            tree[root][1] = left;
            tree.push([element, null, null, root]);
        }

    } else if (element > tree[root][0]) {
        let right = tree[root][2];

        if (right !== null) {
            addNode(tree, right, element);

        } else {
            right = tree.length;
            tree[root][2] = right;
            tree.push([element, null, null, root]);
        }
    }
}

function getLargest(tree, root) {
    let largest = root;

    while (tree[largest][2] !== null) {
        largest = tree[largest][2];
    }

    return largest;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getSecondLargest(fileContent);

fs.writeFileSync('output.txt', result + '');
