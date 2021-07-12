// E. Пирамида

// Ограничение времени    1 секунда
// Ограничение памяти    64Mb
// Ввод    стандартный ввод или input.txt
// Вывод    стандартный вывод или output.txt

// Для строительство двухмерной пирамиды используются прямоугольные блоки, 
// каждый из которых характеризуется шириной и высотой. Можно поставить один 
// блок на другой, только если ширина верхнего блока строго меньше ширины 
// нижнего. Самым нижним в пирамиде может быть блок любой ширины. По заданному 
// набору блоков определите, пирамиду какой наибольшей высоты можно построить из 
// них.

// Формат ввода

// В первой строке входных данных задается число N — количество блоков (1 ≤ N ≤ 
// 100000). В следующий N строках задаются пары натуральных чисел wi и hi (1 ≤ 
// wi, hi ≤ 10^9) — ширина и высота блока соответственно.

// Формат вывода

// Выведите одно целое число — максимальную высоту пирамиды.

// Пример
// Ввод    Вывод
// 3       5
// 3 1
// 2 2
// 3 3

// Примечания
// В примере пирамида будет состоять из двух блоков: нижним блоком будет блок 
// номер 3, а верхним — блок номер 2. Блок номер 1 нельзя использовать вместе с 
// блоком номер 3.

// Язык: Node.js 14.15.5


function calcPyramidHeight(data) {
    const allBlocks = data.toString().trim().split('\n').slice(1);
    let selectedBlocks = {};

    for (let i of allBlocks) {
        const [width, height] = i.split(' ').map(Number);
        if (!(selectedBlocks[width] >= height)) selectedBlocks[width] = height;
    }

    return getValuesSum(selectedBlocks);
}

function getValuesSum(obj) {
    let result = 0;

    for (let key in obj) {
        result += obj[key];
    }

    return result;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = calcPyramidHeight(fileContent);

fs.writeFileSync('output.txt', result + '');
