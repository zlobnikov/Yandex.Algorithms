// A. Двоичный поиск

// Ограничение времени         1 секунда
// Ограничение памяти          64Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Реализуйте двоичный поиск в массиве

// Формат ввода

// В первой строке входных данных содержатся натуральные числа N и K (0 < N, 
// K <= 100 000). Во второй строке задаются N элементов первого массива, а в 
// третьей строке – K элементов второго массива. Элементы обоих массивов - целые 
// числа, каждое из которых по модулю не превосходит 109

// Формат вывода

// Требуется для каждого из K чисел вывести в отдельную строку "YES", если это 
// число встречается в первом массиве, и "NO" в противном случае.

// Пример 1
// Ввод
// 10 10
// 1 61 126 217 2876 6127 39162 98126 712687 1000000000 
// 100 6127 1 61 200 -10000 1 217 10000 1000000000 
// Вывод
// NO
// YES
// YES
// YES
// NO
// NO
// YES
// YES
// NO
// YES

// Язык: Node.js 14.15.5


function checkNumbers(data) {
    const source = data.toString().trim().split('\n');
    const [n, k] = source[0].trim().split(' ').map(Number);
    const model = source[1].trim().split(' ').map(Number)
        .sort((a, b) => a - b);
    const forCheck = source[2].trim().split(' ').map(Number);

    let result = [];

    for (let i = 0; i < k; ++i) {
        if (searchFor(forCheck[i], model)) result.push('YES');
        else result.push('NO');
    }

    return result;
}

function searchFor(number, model) {
    let left = 0;
    let right = model.length - 1;
    let medium;

    while (left < right) {
        medium = Math.floor((left + right) / 2);

        if (number <= model[medium]) right = medium;
        else left = medium + 1;
    }

    return number === model[left];
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = checkNumbers(fileContent);

fs.writeFileSync('output.txt', result.join('\n'));
