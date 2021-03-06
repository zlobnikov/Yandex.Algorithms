// D. Клавиатура

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// На региональном этапе Всероссийской олимпиады школьников по информатике в 
// 2009 году предлагалась следующая задача.

// Всем известно, что со временем клавиатура изнашивается,и клавиши на ней 
// начинают залипать. Конечно, некоторое время такую клавиатуру еще можно 
// использовать, но для нажатий клавиш приходиться использовать большую силу.

// При изготовлении клавиатуры изначально для каждой клавиши задается количество 
// нажатий,которое она должна выдерживать. Если знать эти величины для 
// используемой клавиатуры,то для определенной последовательности нажатых клавиш 
// можно определить,какие клавиши в процессе их использования сломаются, а 
// какие — нет.

// Требуется написать программу, определяющую, какие клавиши сломаются в процессе 
// заданного варианта эксплуатации клавиатуры.

// Формат ввода

// Первая строка входных данных содержит целое число n (1 ≤ n ≤ 1000) — 
// количество клавиш на клавиатуре. Вторая строка содержит n целых чисел —с1, 
// с2, … , сn, где сi (1 ≤ ci ≤ 100000) — количество нажатий, выдерживаемых i-ой 
// клавишей. Третья строка содержит целое число k (1 ≤ k ≤ 100000) — общее 
// количество нажатий клавиш, и последняя строка содержит k целых чисел pj (1 ≤ 
// pj ≤ n) — последовательность нажатых клавиш.

// Формат вывода

// Программа должна вывести n строк, содержащих информацию об исправности 
// клавиш. Если i-я клавиша сломалась, то i-ая строка должна содержать слово 
// YES, если же клавиша работоспособна — слово NO.

// Пример
// Ввод
// 5
// 1 50 3 4 3
// 16
// 1 2 3 4 5 1 3 3 4 5 5 5 5 5 4 5
// Вывод
// YES
// NO
// NO
// NO
// YES

// Язык: Node.js 14.15.5


function checkKeyboard(data) {
    const source = data.toString().trim().split('\n');

    let keyIndex = source[0] - 1;
    let keysStatus = source[1].split(' ');
    let pressingIndex = source[2] - 1;
    const pressedKeys = source[3].split(' ');

    while (pressingIndex >= 0) {
        --keysStatus[pressedKeys[pressingIndex] - 1];
        --pressingIndex;
    }

    while (keyIndex >= 0) {
        keysStatus[keyIndex] = keysStatus[keyIndex] < 0 ? 'YES' : 'NO';
        --keyIndex;
    }

    return keysStatus.join('\n');
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = checkKeyboard(fileContent);

fs.writeFileSync('output.txt', result);
