// B. Приближенный двоичный поиск

// Ограничение времени         1 секунда
// Ограничение памяти          64Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Для каждого из чисел второй последовательности найдите ближайшее к нему в 
// первой.

// Формат ввода

// В первой строке входных данных содержатся числа N и K (0 < N, K < 100 001). 
// Во второй строке задаются N чисел первого массива, отсортированного по 
// неубыванию, а в третьей строке – K чисел второго массива. Каждое число в 
// обоих массивах по модулю не превосходит 2*10^9.

// Формат вывода

// Для каждого из K чисел выведите в отдельную строку число из первого массива, 
// наиболее близкое к данному. Если таких несколько, выведите меньшее из них.

// Пример 1
// Ввод                                Вывод
// 5 5                                 1
// 1 3 5 7 9                           3
// 2 4 8 1 6                           7
//                                     1
//                                     5

// Пример 2
// Ввод                                Вывод
// 6 11                                1
// 1 1 4 4 8 120                       1
// 1 2 3 4 5 6 7 8 63 64 65            4
//                                     4
//                                     4
//                                     4
//                                     8
//                                     8
//                                     8
//                                     8
//                                     120

// Пример 3
// Ввод                                Вывод
// 10 10                               1
// -5 1 1 3 5 5 8 12 13 16             3
// 0 3 7 -17 23 11 0 11 15 7           8
//                                     -5
//                                     16
//                                     12
//                                     1
//                                     12
//                                     16
//                                     8

// Язык: Node.js 14.15.5


function getNumbers(data) {
    const [[n, k], model, forSearch] = data.toString().trim().split('\n')
        .map(a => a.trim().split(' ').map(Number));

    let result = [];

    for (let i = 0; i < k; ++i) {
        result.push(getClosest(forSearch[i], model));
    }

    return result;
}

function getClosest(number, model) {
    let left = 0;
    let right = model.length - 1;

    if (number >= model[right]) return model[right];

    while (left < right) {
        let medium = Math.floor((left + right + 1) / 2);

        if (number < model[medium]) right = medium - 1;
        else left = medium;
    }

    const leftDiff = Math.abs(number - model[left]);
    const nextDiff = Math.abs(number - model[left + 1]);

    return leftDiff <= nextDiff ? model[left] : model[left + 1];
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getNumbers(fileContent);

fs.writeFileSync('output.txt', result.join('\n'));
