// A. Возрастает ли список?

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод               	    стандартный вывод или output.txt

// Дан список. Определите, является ли он монотонно возрастающим (то есть верно 
// ли, что каждый элемент этого списка больше предыдущего).

// Выведите YES, если массив монотонно возрастает и NO в противном случае.

// Пример 1
// Ввод	        Вывод
// 1 7 9       YES

// Пример 2
// Ввод	        Вывод
// 1 9 7        NO

// Пример 3
// Ввод	        Вывод
// 2 2 2        NO

// Язык: Node.js 14.15.5


function isListAscending(data) {
    data = data.toString().trim().split(' ').map(n => +n);
    for (let i = 1; i < data.length; i++) {
        if (data[i] <= data[i - 1]) return 'NO';
    }
    return 'YES';
}

process.stdin.on('data', data => {
    let result = isListAscending(data);
    process.stdout.write(result);
    process.exit();
});
