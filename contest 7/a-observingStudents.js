// A. Наблюдение за студентами

// Ограничение времени         1 секунда
// Ограничение памяти          64Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// На первом курсе одной Школы, учится 1 ≤ N ≤ 10^9 студентов. При проведении 
// экзаменов студентов рассаживают в ряд, каждого за своей партой. Парты 
// пронумерованы числами от 0 до N - 1.

// Известно, что студент, оставшись без наблюдения, открывает телефон и начинает 
// искать ответы на экзамен в поисковике Яндекса.

// Поэтому было решено позвать M преподавателей наблюдать за студентами. Когда 
// за студентом наблюдает хотя бы один преподаватель, он стесняется и не идет 
// искать ответы к экзамену. Преподаватель с номером i видит студентов сидящих 
// за партами от bi до ei включительно.

// Необходимо посчитать количество студентов, которые все таки будут искать 
// ответы к экзамену в Яндексе

// Формат ввода

// В первой строке находятся два целых числа 1 ≤ N ≤ 10^9, 1 ≤ M ≤ 10^4 — число 
// студентов и число преподавателей соответственно. В следующих M строках 
// содержится по два целых числа 0 ≤ bi ≤ ei ≤ N - 1 — парты, за которыми 
// наблюдает i-й преподаватель.

// Формат вывода

// Выведите одно число — количество студентов оставшихся без наблюдения.

// Пример 1
// Ввод            Вывод
// 10 3            5
// 1 3
// 2 4
// 9 9

// Пример 2
// Ввод            Вывод
// 10 2            8
// 1 1
// 1 2

// Язык: Node.js 14.15.5


function countUnattendedStudents(data) {
    const source = data.toString().trim().split('\n');
    const [students, teachers] = source[0].split(' ').map(Number);
    const desks = source.slice(1).map(a => a.split(' ').map(Number));

    let events = [];

    for (let i = 0; i < teachers; ++i) {
        events.push([desks[i][0], -1]);
        events.push([desks[i][1], 1]);
    }

    events.sort((a, b) => a[0] - b[0]);
    console.log(events);

    let observers = 0;
    let unattended = events[0][0];

    for (let i = 0; i < events.length; ++i) {
        if (observers === 0 && i !== 0 && events[i][0] !== events[i - 1][0]) {
            unattended += events[i][0] - events[i - 1][0] - 1;
        }

        if (events[i][1] === -1) ++observers;
        else --observers;
    }

    // unattended tail
    unattended += students - 1 - events[events.length - 1][0];

    return unattended;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = countUnattendedStudents(fileContent);

fs.writeFileSync('output.txt', result + '');
