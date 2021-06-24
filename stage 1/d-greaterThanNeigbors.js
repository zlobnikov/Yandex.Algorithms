// D. Больше своих соседей

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Дан список чисел. Определите, сколько в этом списке элементов, которые больше 
// двух своих соседей и выведите количество таких элементов.

// Формат ввода

// Вводится список чисел. Все числа списка находятся на одной строке.

// Формат вывода

// Выведите ответ на задачу.

// Пример 1
// Ввод	            Вывод
// 1 2 3 4 5        0

// Пример 2
// Ввод	            Вывод
// 5 4 3 2 1        0

// Пример 3
// Ввод	            Вывод
// 1 5 1 5 1        2

// Язык: Node.js 14.15.5


function countGreaterThanNeighbors(data) {
    let sequence = data.toString().trim().split(' ').map(n => +n);

    let counter = 0;
    for (let i = 1; i < sequence.length - 1; i++) {
        if (sequence[i] < sequence[i - 1]) continue;

        if (sequence[i] > sequence[i + 1]) {
            counter++;
            i++;
        }
    }

    return counter;
}

process.stdin.on('data', data => {
    let result = countGreaterThanNeighbors(data);
    process.stdout.write(result + '');
    process.exit();
});
