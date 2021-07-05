// B. Пересечение множеств

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Даны два списка чисел, которые могут содержать до 10000 чисел каждый. 
// Выведите все числа, которые входят как в первый, так и во второй список в 
// порядке возрастания. Примечание. И даже эту задачу на Питоне можно решить в 
// одну строчку.

// Формат ввода

// Вводятся два списка целых чисел. Все числа каждого списка находятся на 
// отдельной строке.

// Формат вывода

// Выведите ответ на задачу.

// Пример 1
// Ввод	                Вывод
// 1 3 2                2 3
// 4 3 2

// Пример 2
// Ввод	                Вывод
// 1 2 6 4 5 7          2 4
// 10 2 3 4 8

// Язык: Node.js 14.15.5


function intersection(data) {
    const source = data.toString().trim().split('\n');
    const [a, b] = source.map(x => new Set(x.split(' ').map(Number)));
    return [...a].filter(x => b.has(x)).sort((a, b) => a - b);
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = intersection(fileContent);

fs.writeFileSync('output.txt', result.join(' '));
