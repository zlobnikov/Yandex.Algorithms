// F. Расстановка ноутбуков

// Ограничение времени	1 секунда
// Ограничение памяти	64Mb
// Ввод	стандартный ввод или input.txt
// Вывод	стандартный вывод или output.txt

// В школе решили на один прямоугольный стол поставить два прямоугольных 
// ноутбука. Ноутбуки нужно поставить так, чтобы их стороны были параллельны 
// сторонам стола. Определите, какие размеры должен иметь стол, чтобы оба 
// ноутбука на него поместились, и площадь стола была минимальна.

// Формат ввода

// Вводится четыре натуральных числа, первые два задают размеры одного ноутбука, 
// а следующие два — размеры второго. Числа не превышают 1000.

// Формат вывода

// Выведите два числа — размеры стола. Если возможно несколько ответов, выведите 
// любой из них (но только один).

// Пример 1
// Ввод            Вывод
// 10 2 2 10       20 2
//                 2 20
//                 4 10
//                 10 4

// Пример 2
// Ввод            Вывод
// 5 7 3 2         9 5
//                 5 9

// Примечания

// В примерах указаны всевозможные ответы на поставленную задачу. Ваша программа 
// должна вывести один из них.

// Язык: Node.js 14.15.5


function calcTableSizes(data) {
    const [a, b, c, d] = data.toString().trim().split(' ').map(n => +n);

    let x, y;
    const options = [
        [x = Math.max(a, c), y = b + d, x * y],
        [x = Math.max(a, d), y = b + c, x * y],
        [x = Math.max(b, c), y = a + d, x * y],
        [x = Math.max(b, d), y = a + c, x * y]
    ];

    const answer = getMinSizes(options);
    return answer.join(' ');
}

function getMinSizes(options) {
    let width = options[0][0];
    let depth = options[0][1];
    let area = options[0][2];

    for (let i = 1; i <= 3; i++) {
        if (area > options[i][2]) {
            width = options[i][0];
            depth = options[i][1];
            area = options[i][2];
        }
    }

    return [width, depth];
}

process.stdin.on('data', data => {
    const result = calcTableSizes(data);
    process.stdout.write(result);
    process.exit();
});
