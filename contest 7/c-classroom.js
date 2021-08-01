// C. Рассадка в аудитории

// Ограничение времени         1 секунда
// Ограничение памяти          64Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Экзамен по берляндскому языку проходит в узкой и длинной аудитории. На 
// экзамен пришло N студентов. Все они посажены в ряд. Таким образом, позиция 
// каждого человека задается координатой на оси Ox (эта ось ведет вдоль длинной 
// аудитории). Два человека могут разговаривать, если расстояние между ними 
// меньше или равно D. Какое наименьшее количество типов билетов должен 
// подготовить преподаватель, чтобы никакие два студента с одинаковыми билетами 
// не могли разговаривать? Выведите способ раздачи преподавателем билетов.

// Формат ввода

// В первой строке входного файла содержится два целых числа N, D (1 ≤ N ≤ 
// 10000; 0 ≤ D ≤ 10^6). Вторая строка содержит последовательность различных 
// целых чисел X1, X2, ..., XN, где Xi (0 ≤ Xi ≤ 10^6) обозначает координату 
// вдоль оси Ox i-го студента

// Формат вывода

// В первую строчку выходного файла выведите количество вариантов, а во вторую, 
// разделяя пробелами, номера вариантов студентов в том порядке, в каком они 
// перечислены во входном файле.

// Пример 1
// Ввод
// 4 1
// 11 1 12 2
// Вывод
// 2
// 1 1 2 2 

// Пример 2
// Ввод
// 4 0
// 11 1 12 2
// Вывод
// 1
// 1 1 1 1 

// Язык: Node.js 14.15.5


function calcOptions(data) {
    const [[n, d], students] = data.toString().trim().split('\n')
        .map(a => a.split(' ').map(Number));

    let events = [];

    for (let i = 0; i < n; ++i) {
        events.push([students[i], -1, i]);
        events.push([students[i] + d, 1, i]);
    }

    events.sort(sortEvents);

    let neighbors = 0;
    let maxNeighbors = 0;
    let order = Array(n);

    let options = [];
    for (let i = n; i > 0; --i) options.push(i);

    for (let i = 0; i < events.length; ++i) {
        if (events[i][1] === -1) {
            ++neighbors;
            order[events[i][2]] = options.pop();
        } else {
            --neighbors;
            options.push(order[events[i][2]]);
        }

        if (neighbors > maxNeighbors) maxNeighbors = neighbors;
    }

    return [maxNeighbors, order.join(' ')].join('\n');
}

function sortEvents(a, b) {
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = calcOptions(fileContent);

fs.writeFileSync('output.txt', result);
