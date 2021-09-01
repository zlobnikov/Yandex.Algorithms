// H. Наибольшее произведение трех чисел

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// В данном списке из n ≤ 105 целых чисел найдите три числа, произведение 
// которых максимально.

// Решение должно иметь сложность O(n), где n - размер списка.

// Выведите три искомых числа в любом порядке.

// Пример 1
// Ввод	                        Вывод
// 3 5 1 7 9 0 9 -3 10          10 9 9

// Пример 2
// Ввод	                        Вывод
// -5 -30000 -12                -5 -12 -30000

// Пример 3
// Ввод	                        Вывод
// 1 2 3                        3 2 1

// Язык: Node.js 14.15.5


function getNumbers(data) {
    let numbers = data.toString().trim().split(' ').map(Number);

    let [max1, max2, max3] = numbers.slice(0, 3).sort((a, b) => b - a);
    let [min1, min2] = [max3, max2];

    for (let i of numbers.slice(3)) {
        if (i > max1) [max1, max2, max3] = [i, max1, max2];
        else if (i > max2) [max2, max3] = [i, max2];
        else if (i > max3) max3 = i;

        if (i < min1) [min1, min2] = [i, min1];
        else if (i < min2) min2 = i;
    }

    let product1 = max1 * max2 * max3;
    let product2 = min1 * min2 * max1;

    return product1 >= product2 ? [max1, max2, max3] : [max1, min2, min1];
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getNumbers(fileContent);

fs.writeFileSync('output.txt', result.join(' '));
