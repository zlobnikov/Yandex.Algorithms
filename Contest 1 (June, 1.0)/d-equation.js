// D. Уравнение с корнем

// Ограничение времени	1 секунда
// Ограничение памяти	64Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt

// Решите в целых числах уравнение:

// (a * x + b) ** 0.5 = c,

// a, b, c – данные целые числа: найдите все решения или сообщите, что решений в 
// целых числах нет.

// Формат ввода

// Вводятся три числа a, b и c по одному в строке.

// Формат вывода

// Программа должна вывести все решения уравнения в порядке возрастания, либо NO 
// SOLUTION (заглавными буквами), если решений нет. Если решений бесконечно 
// много, вывести MANY SOLUTIONS.

// Пример 1
// Ввод    	Вывод
// 1           0
// 0
// 0

// Пример 2
// Ввод	    Вывод
// 1           7
// 2
// 3

// Пример 3
// Ввод	    Вывод
// 1           NO SOLUTION
// 2
// -3

// Язык: Node.js 14.15.5


function solve(data) {
    const [a, b, c] = data.toString().trim().split('\n').map(n => +n);

    if (c < 0) return 'NO SOLUTION';
    if (a === 0) return Math.sqrt(b) === c ? 'MANY SOLUTIONS' : 'NO SOLUTION';

    const x = (c ** 2 - b) / a;
    if (Math.round(x) !== x) return 'NO SOLUTION';

    return x.toString();
}

process.stdin.on('data', data => {
    let result = solve(data);
    process.stdout.write(result);
    process.exit();
});
