// A. Количество различных чисел

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Дан список чисел, который может содержать до 100000 чисел. Определите, 
// сколько в нем встречается различных чисел.

// Формат ввода

// Вводится список целых чисел. Все числа списка находятся на одной строке.

// Формат вывода

// Выведите ответ на задачу.

// Пример 1
// Ввод	                        Вывод
// 1 2 3 2 1                    3

// Пример 2
// Ввод	                        Вывод
// 1 2 3 4 5 6 7 8 9 10         10
// Пример 3
// Ввод	                        Вывод
// 1 2 3 4 5 1 2 1 2 7 3        6

// Язык: Node.js 14.15.5


// Solution #1
function countDifferentNumbers(data) {
    const numbersList = data.toString().trim().split(' ');
    let numbersSet = {};
    let counter = 0;

    for (let i of numbersList) {
        if (numbersSet[i] === undefined) {
            numbersSet[i] = true;
            counter++;
        }
    }
    return counter;
}

// // Solution #2
// function countDifferentNumbers(data) {
//     return (new Set(data.toString().trim().split(' '))).size;
// }


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = countDifferentNumbers(fileContent);

fs.writeFileSync('output.txt', result + '');
