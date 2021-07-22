// H. Подстрока

// Ограничение времени         1 секунда
// Ограничение памяти          64Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// В этой задаче Вам требуется найти максимальную по длине подстроку данной 
// строки, такую что каждый символ встречается в ней не более k раз.

// Формат ввода

// В первой строке даны два целых числа n и k (1 ≤ n ≤ 100000, 1 ≤ k ≤ n ) , где 
// n – количество символов в строке. Во второй строке n символов – данная 
// строка, состоящая только из строчных латинских букв.

// Формат вывода

// В выходной файл выведите два числа – длину искомой подстроки и номер её 
// первого символа. Если решений несколько, выведите любое.

// Пример 1
// Ввод        Вывод
// 3 1         2 1
// abb

// Пример 2
// Ввод        Вывод
// 5 2         4 1
// ababa

// Язык: Node.js 14.15.5


function getSubstringData(data) {
    const source = data.toString().trim().split('\n');
    const [n, k] = source[0].split(' ').map(Number);
    const string = source[1];

    let lettersCounter = {[string[0]]: 1};
    let startIndex = 0;
    let maxLength = 1;
    let currentLength = 1;

    for (let left = 0, right = 1; right < n; ++right) {
        lettersCounter[string[right]] = ++lettersCounter[string[right]] || 1;
        ++currentLength;

        while (lettersCounter[string[right]] > k) {
            --lettersCounter[string[left]];
            ++left;
            --currentLength;
        }

        if (currentLength > maxLength) {
            maxLength = currentLength;
            startIndex = left;
        }
    }

    return [maxLength, startIndex + 1].join(' ');
}


const fs = required('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getSubstringData(fileContent);

fs.writeFileSync('output.txt', result);
