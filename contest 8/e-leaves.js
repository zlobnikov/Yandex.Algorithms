// E. Вывод листьев

//                             Все языки           Python 3.6
// Ограничение времени         2 секунды           4 секунды
// Ограничение памяти          64Mb                256Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Для полученного дерева выведите список всех листьев (вершин, не имеющих 
// потомков) в порядке возрастания.

// Формат ввода

// Вводится последовательность целых чисел, оканчивающаяся нулем. Сам ноль в 
// последовательность не входит.

// Формат вывода

// Выведите ответ на задачу.

// Пример
// Ввод                        Вывод
// 7 3 2 1 9 5 4 6 8 0         1
//                             4
//                             6
//                             8

// Язык: Node.js 14.15.5


function getLeavesAscending(data) {
    const sequence = data.toString().trim().split(' ').map(Number);

    const leftChildIndex = null;
    const rightChildIndex = null;
    const parentIndex = null;
    const rootIndex = 0;

    const tree = [[sequence[0], leftChildIndex, rightChildIndex, parentIndex]];

    let currentIndex = 1;

    while (sequence[currentIndex] !== 0) {
        addNode(tree, rootIndex, sequence[currentIndex++]);
    }

    const result = [];
    let smallestLeafIndex = getSmallestLeaf(tree, rootIndex);

    while (smallestLeafIndex !== null) {
        result.push(tree[smallestLeafIndex][0]);
        smallestLeafIndex = addBiggerLeaf(tree, smallestLeafIndex);
    }

    return result;
}

function addNode(tree, rootIndex, element) {
    if (element < tree[rootIndex][0]) {
        let leftChildIndex = tree[rootIndex][1];

        if (leftChildIndex !== null) {
            addNode(tree, leftChildIndex, element);

        } else {
            leftChildIndex = tree.length;
            tree[rootIndex][1] = leftChildIndex;
            tree.push([element, null, null, rootIndex]);
        }

    } else if (element > tree[rootIndex][0]) {
        let rightChildIndex = tree[rootIndex][2];

        if (rightChildIndex !== null) {
            addNode(tree, rightChildIndex, element);

        } else {
            rightChildIndex = tree.length;
            tree[rootIndex][2] = rightChildIndex;
            tree.push([element, null, null, rootIndex]);
        }
    }
}

function getSmallestLeaf(tree, rootIndex) {
    let currentIndex = rootIndex;
    let leftChildIndex = tree[currentIndex][1];
    let rightChildIndex = tree[currentIndex][2];

    while (leftChildIndex !== null || rightChildIndex !== null) {
        currentIndex = leftChildIndex ? leftChildIndex : rightChildIndex;
        leftChildIndex = tree[currentIndex][1];
        rightChildIndex = tree[currentIndex][2];
    }

    return currentIndex;
}

function addBiggerLeaf(tree, smallestLeafIndex) {
    let currentIndex = smallestLeafIndex;
    let parentIndex = tree[currentIndex][3];
    if (parentIndex === null) return null;

    let rightSiblingIndex = tree[parentIndex][2];

    while (currentIndex === rightSiblingIndex || rightSiblingIndex === null) {
        currentIndex = parentIndex;
        parentIndex = tree[currentIndex][3];
        if (parentIndex === null) return null;

        rightSiblingIndex = tree[parentIndex][2];
    }

    return getSmallestLeaf(tree, rightSiblingIndex);
}


const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getLeavesAscending(fileContent);

fs.writeFileSync('output.txt', result.join('\n'));
