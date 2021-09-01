// I. Сапер

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Вам необходимо построить поле для игры "Сапер" по его конфигурации – размерам 
// и координатам расставленных на нем мин.

// Вкратце напомним правила построения поля для игры "Сапер":
// - Поле состоит из клеток с минами и пустых клеток
// - Клетки с миной обозначаются символом *
// - Пустые клетки содержат число ki,j, 0≤ ki, j ≤ 8 – количество мин на 
// соседних клетках. Соседними клетками являются восемь клеток, имеющих смежный 
// угол или сторону.

// Формат ввода

// В первой строке содержатся три числа: N, 1 ≤ N ≤ 100 - количество строк на 
// поле, M, 1 ≤ M ≤ 100 - количество столбцов на поле, K, 0 ≤ K ≤ N ⋅ M - 
// количество мин на поле.

// В следующих K строках содержатся по два числа с координатами мин: 
// p, 1 ≤ p ≤ N - номер строки мины, q, 1 ≤ 1 ≤ M - номер столбца мины.

// Формат вывода

// Выведите построенное поле, разделяя строки поля переводом строки, а столбцы - 
// пробелом.

// Пример 1
// Ввод	            Вывод
// 3 2 2            * 2
// 1 1              2 *
// 2 2              1 1

// Пример 2
// Ввод             Вывод
// 2 2 0            0 0
//                  0 0

// Пример 3
// Ввод    	        Вывод
// 4 4 4            1 2 * 1 
// 1 3              * 2 1 1 
// 2 1              2 2 2 1 
// 4 2              1 * 2 * 
// 4 4         

// Язык: Node.js 14.15.5


function getField(data) {
    const source = data.toString().trim().split('\n');
    const [rows, cols] = source[0].split(' ').map(Number);

    let field = [];
    for (let y = 0; y < rows; y++) {
        field[y] = Array(cols).fill(0);
    }

    field = setBombs(field, source.slice(1));

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (field[y][x] === 0) {
                field[y][x] = checkAround(field, y, x, rows, cols);
            }
        }
    }

    return field;
}

function setBombs(field, coords) {
    for (let i of coords) {
        const [y, x] = i.split(' ').map(Number);
        field[y - 1][x - 1] = '*';
    }

    return field;
}

function checkAround(field, y, x, rows, cols) {
    let counter = 0;

    for (let yAdd = -1; yAdd <= 1; yAdd++) {
        let yCoord = y + yAdd;
        if (yCoord < 0 || yCoord >= rows) continue;

        for (let xAdd = -1; xAdd <= 1; xAdd++) {
            let xCoord = x + xAdd;
            if (xCoord < 0 || xCoord >= cols) continue;

            if (field[yCoord][xCoord] === '*') counter++;
        }
    }

    return counter;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getField(fileContent);

fs.writeFileSync('output.txt', result.map(a => a.join(' ')).join('\n'));
