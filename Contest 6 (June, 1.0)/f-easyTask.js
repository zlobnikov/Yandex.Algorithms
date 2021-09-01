// F. Очень легкая задача

// Ограничение времени         1 секунда
// Ограничение памяти          64Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Сегодня утром жюри решило добавить в вариант олимпиады еще одну, Очень Легкую 
// Задачу. Ответственный секретарь Оргкомитета напечатал ее условие в одном 
// экземпляре, и теперь ему нужно до начала олимпиады успеть сделать еще N 
// копий. В его распоряжении имеются два ксерокса, один из которых копирует лист 
// за х секунд, а другой – за y. (Разрешается использовать как один ксерокс, так 
// и оба одновременно. Можно копировать не только с оригинала, но и с копии.) 
// Помогите ему выяснить, какое минимальное время для этого потребуется.

// Формат ввода

// На вход программы поступают три натуральных числа N, x и y, разделенные 
// пробелом (1 ≤ N ≤ 2 × 10^8, 1 ≤ x, y ≤ 10).

// Формат вывода

// Выведите одно число – минимальное время в секундах, необходимое для получения 
// N копий.

// Пример 1
// Ввод            Вывод
// 4 1 1           3

// Пример 2
// Ввод            Вывод
// 5 1 2           4

// Язык: Node.js 14.15.5


function calcTime(data) {
    const [n, x, y] = data.toString().trim().split(' ').map(Number);
    const fastest = Math.min(x, y);

    let left = fastest;
    let right = n * x;

    while (left < right) {
        let medium = Math.floor((left + right) / 2);

        if (checkTime(medium)) right = medium;
        else left = medium + 1;
    }

    function checkTime(medium) {
        let time = medium - fastest;
        let xCopies = Math.floor(time / x);
        let yCopies = Math.floor(time / y);
        let total = xCopies + yCopies + 1;
    
        return total >= n;
    }

    return left;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = calcTime(fileContent);

fs.writeFileSync('output.txt', result + '');
