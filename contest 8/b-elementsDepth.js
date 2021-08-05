// B. Глубина добавляемых элементов

//                             Все языки           Python 3.6
// Ограничение времени         2 секунды           4 секунды
// Ограничение памяти          64Mb                256Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// В бинарное дерево поиска добавляются элементы. Выведите глубину для каждого 
// добавленного элемента в том порядке, как они добавлялись. Если элемент уже 
// есть в дереве, то ничего добавлять и выводить не нужно. Глубиной называется 
// расстояние от корня дерева до элемента включительно.

// Формат ввода

// Вводится последовательность целых чисел, оканчивающаяся нулем. Сам ноль в 
// последовательность не входит. По данной последовательности требуется 
// построить дерево.

// Формат вывода

// Выведите ответ на задачу.

// Пример
// Ввод                        Вывод
// 7 3 2 1 9 5 4 6 8 0         1 2 3 4 2 3 4 4 3 

// Язык: Node.js 14.15.5


function getHeight(data) {
    const sequence = data.toString().trim().split(' ').map(Number);

    if (sequence[0] === 0) return 0;

    let tree = [[sequence[0], null, null, 1]]
    let i = 1; 

    while (sequence[i] !== 0) {
        addElement(tree, 0, 1, sequence[i++]);
    }

    return tree.map(a => a[3]).join(' ');
}

function addElement(tree, root, height, element) {
    ++height;

    if (element < tree[root][0]) {
        let left = tree[root][1];

        if (tree[left]) {
            return addElement(tree, left, height, element);
        } else {
            left = tree.length;
            tree[root][1] = left;
            tree[left] = [element, null, null, height];
        }

    } else if (element > tree[root][0]) {
        let right = tree[root][2];

        if (tree[right]) {
            return addElement(tree, right, height, element);
        } else {
            right = tree.length;
            tree[root][2] = right;
            tree[right] = [element, null, null, height];
        }
    }
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getHeight(fileContent);

fs.writeFileSync('output.txt', result);
