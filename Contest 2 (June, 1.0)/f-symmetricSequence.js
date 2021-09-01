// F. Симметричная последовательность

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Последовательность чисел назовем симметричной, если она одинаково читается 
// как слева направо, так и справа налево. Например, следующие 
// последовательности являются симметричными: 1 2 3 4 5 4 3 2 1, 1 2 1 2 2 1 2 1 
// Вашей программе будет дана последовательность чисел. Требуется определить, 
// какое минимальное количество и каких чисел надо приписать в конец этой 
// последовательности, чтобы она стала симметричной.

// Формат ввода

// Сначала вводится число N — количество элементов исходной последовательности 
// (1 ≤ N ≤ 100). Далее идут N чисел — элементы этой последовательности, 
// натуральные числа от 1 до 9.

// Формат вывода

// Выведите сначала число M — минимальное количество элементов, которое надо 
// дописать к последовательности, а потом M чисел (каждое — от 1 до 9) — числа, 
// которые надо дописать к последовательности.

// Пример 1
// Ввод	                    Вывод
// 9                        0
// 1 2 3 4 5 4 3 2 1

// Пример 2
// Ввод	                    Вывод
// 5                        3
// 1 2 1 2 2                1 2 1

// Пример 3
// Ввод	                    Вывод
// 5                        4
// 1 2 3 4 5                4 3 2 1

// Язык: Node.js 14.15.5


function getNumbers(data) {
    const original = data.toString().trim().split('\n')[1].split(' ');
    const reversed = original.slice().reverse();

    const length = original.length;
    let additive = 0;

    while (additive < length) {
        if (isSymmetric(
            original.slice(additive),
            reversed.slice(0, length - additive)
        )) break;

        additive++;
    }

    if (additive) additive += `\n${reversed.slice(length - additive).join(' ')}`;

    return additive;
}

function isSymmetric(original, reversed) {
    for (let i in original) {
        if (original[i] !== reversed[i]) return false;
    }

    return true;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getNumbers(fileContent);

fs.writeFileSync('output.txt', result.toString());
