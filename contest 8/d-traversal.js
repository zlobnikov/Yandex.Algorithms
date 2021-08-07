// D. Обход

//                             Все языки           Python 3.6
// Ограничение времени         2 секунды           4 секунды
// Ограничение памяти          64Mb                256Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Выведите все элементы полученного дерева в порядке возрастания.

// Формат ввода

// Вводится последовательность целых чисел, оканчивающаяся нулем. Сам ноль в 
// последовательность не входит. По данной последовательности требуется 
// построить дерево.

// Формат вывода

// Выведите ответ на задачу.

// Пример
// Ввод                    Вывод
// 7 3 2 1 9 5 4 6 8 0     1
//                         2
//                         3
//                         4
//                         5
//                         6
//                         7
//                         8
//                         9

// Язык: Node.js 14.15.5


function getAscendingSequence(data) {
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

    const indexOfSmallest = getSmallest(tree, rootIndex);
    const resultSequence = [tree[indexOfSmallest][0]];

    addBiggerNodes(resultSequence, tree, indexOfSmallest);

    return resultSequence;
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

function getSmallest(tree, rootIndex) {
    let indexOfSmallest = rootIndex;

    while (tree[indexOfSmallest][1] !== null) {
        indexOfSmallest = tree[indexOfSmallest][1];
    }

    return indexOfSmallest;
}

function addBiggerNodes(resultSequence, tree, indexOfSmallest) {
    const rightChildIndex = tree[indexOfSmallest][2];

    if (rightChildIndex !== null) {
        const indexOfNextSmallest = getSmallest(tree, rightChildIndex);
        resultSequence.push(tree[indexOfNextSmallest][0]);
        addBiggerNodes(resultSequence, tree, indexOfNextSmallest);
    }

    const parentIndex = tree[indexOfSmallest][3];

    if (parentIndex !== null && indexOfSmallest !== tree[parentIndex][2]) {
        resultSequence.push(tree[parentIndex][0]);
        addBiggerNodes(resultSequence, tree, parentIndex);
    }
}


const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getAscendingSequence(fileContent);

fs.writeFileSync('output.txt', result.join('\n'));
