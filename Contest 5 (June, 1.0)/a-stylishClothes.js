// A. Стильная одежда

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// Глеб обожает шоппинг. Как-то раз он загорелся идеей подобрать себе майку и 
// штаны так, чтобы выглядеть в них максимально стильно. В понимании Глеба 
// стильность одежды тем больше, чем меньше разница в цвете элементов его 
// одежды.

// В наличии имеется N (1 ≤ N ≤ 100 000) маек и M (1 ≤ M ≤ 100 000) штанов, про 
// каждый элемент известен его цвет (целое число от 1 до 10 000 000). Помогите 
// Глебу выбрать одну майку и одни штаны так, чтобы разница в их цвете была как 
// можно меньше.

// Формат ввода

// Сначала вводится информация о майках: в первой строке целое число N (1 ≤ N ≤ 
// 100 000) и во второй N целых чисел от 1 до 10 000 000 — цвета имеющихся в 
// наличии маек. Гарантируется, что номера цветов идут в возрастающем порядке (в 
// частности, цвета никаких двух маек не совпадают).

// Далее в том же формате идёт описание штанов: их количество M (1 ≤ M ≤ 
// 100 000) и в следующей строке M целых чисел от 1 до 10 000 000 в возрастающем 
// порядке — цвета штанов.

// Формат вывода

// Выведите пару неотрицательных чисел — цвет майки и цвет штанов, которые 
// следует выбрать Глебу. Если вариантов выбора несколько, выведите любой из них.

// Пример 1
// Ввод         Вывод
// 2            3 3
// 3 4
// 3
// 1 2 3

// Пример 2
// Ввод         Вывод
// 2            4 3
// 4 5
// 3
// 1 2 3

// Пример 3
// Ввод         Вывод
// 5            1 1
// 1 2 3 4 5
// 5
// 1 2 3 4 5

// Язык: Node.js 14.15.5


function getClothes(data) {
    const source = data.toString().trim().split('\n');

    const n = +source[0];
    const shirts = source[1].split(' ').map(Number);

    const m = +source[2];
    const pants = source[3].split(' ').map(Number);

    let bestShirtIndex = 0;
    let bestPantsIndex = 0;
    let minDiff = Math.abs(shirts[0] - pants[0]);

    for (let i = 0, j = 0; i < n; ++i) {
        for (; j < m; ++j) {
            let currentDiff = Math.abs(shirts[i] - pants[j]);

            if (currentDiff === 0) return [shirts[i], pants[j]].join(' ');

            if (currentDiff < minDiff) {
                minDiff = currentDiff;
                bestShirtIndex = i;
                bestPantsIndex = j;

                if (pants[j] > shirts[i]) break;

            } else if (pants[j] > shirts[i]) break;

            if (j === m && shirts[i] > pants[j - 1]) break;
        }
    }

    return [shirts[bestShirtIndex], pants[bestPantsIndex]].join(' ');
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getClothes(fileContent);

fs.writeFileSync('output.txt', result);
