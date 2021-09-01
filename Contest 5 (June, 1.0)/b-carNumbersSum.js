// B. Сумма номеров

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// Вася очень любит везде искать своё счастливое число K. Каждый день он ходит в 
// школу по улице, вдоль которой припарковано N  машин. Он заинтересовался 
// вопросом, сколько существует наборов машин, стоящих подряд на местах с L до 
// R, что сумма их номеров равна K. Помогите Васе узнать ответ на его вопрос. 

// Например, если число N = 5, K = 17, а номера машин равны 17, 7, 10, 7, 10, то 
// существует 4 набора машин:
// 17 (L = 1 , R = 1), 
// 7, 10 (L = 2 , R = 3), 
// 10, 7 (L = 3 , R = 4), 
// 7, 10 (L = 4 , R = 5)

// Формат ввода

// В первой строке входных данных задаются числа N и K (1 ≤ N ≤ 100000, 1 ≤ K ≤ 
// 10^9). Во второй строке содержится N чисел, задающих номера машин. Номера 
// машин могут принимать значения от 1 до 999 включительно.

// Формат вывода

// Необходимо вывести одно число — количество наборов.

// Пример 1
// Ввод                 Вывод
// 5 17                 4
// 17 7 10 7 10

// Пример 2
// Ввод                 Вывод
// 5 10                 2
// 1 2 3 4 1

// Язык: Node.js 14.15.5


function countSets(data) {
    const source = data.toString().trim().split('\n');
    const [quantity, luckyNumber] = source[0].split(' ').map(Number);
    const carNumbers = source[1].split(' ').map(Number);

    let sum = 0;
    let counter = 0;
    let right = 0;

    for (let left = 0; left < quantity; ++left) {
        if (right < left) ++right;

        while (sum <= luckyNumber && right < quantity) {
            sum += carNumbers[right];
            if (sum === luckyNumber) ++counter;
            ++right;
        }

        sum -= carNumbers[left];
        if (sum === luckyNumber) ++counter;
    }

    return counter;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

console.log(countSets(fileContent));
