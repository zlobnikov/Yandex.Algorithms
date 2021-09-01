// B. Определить вид последовательности

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// По последовательности чисел во входных данных определите ее вид:

// CONSTANT – последовательность состоит из одинаковых значений
// ASCENDING – последовательность является строго возрастающей
// WEAKLY ASCENDING – последовательность является нестрого возрастающей
// DESCENDING – последовательность является строго убывающей
// WEAKLY DESCENDING – последовательность является нестрого убывающей
// RANDOM – последовательность не принадлежит ни к одному из вышеупомянутых 
// типов

// Формат ввода

// По одному на строке поступают числа последовательности ai, |ai| ≤ 109.

// Признаком окончания последовательности является число -2× 109. Оно в 
// последовательность не входит.

// Формат вывода

// В единственной строке выведите тип последовательности.

// Пример
// Ввод	            Вывод
// -530             CONSTANT
// -530
// -530
// -530
// -530
// -530
// -2000000000

// Язык: Node.js 14.15.5


function getSequenceType(data) {
    let sequence = data.toString().trim().split('\n').map(Number);
    let type, previous;

    for (let current of sequence) {
        if (current === -2e9) break;
        [previous, type] = checkNextElement(current, previous, type);
    }

    return type;
}

function checkNextElement(current, previous, type) {
    if (previous === undefined);

    else if (type === undefined) {
        if (current < previous) type = 'DESCENDING';
        else if (current === previous) type = 'CONSTANT';
        else type = 'ASCENDING';

    } else if (type === 'CONSTANT') {
        if (current < previous) type = 'WEAKLY DESCENDING';
        else if (current > previous) type = 'WEAKLY ASCENDING';

    } else if (type === 'ASCENDING') {
        if (current < previous) type = 'RANDOM';
        else if (current === previous) type = 'WEAKLY ASCENDING';

    } else if (type === 'WEAKLY ASCENDING') {
        if (current < previous) type = 'RANDOM';

    } else if (type === 'DESCENDING') {
        if (current === previous) type = 'WEAKLY DESCENDING';
        else if (current > previous) type = 'RANDOM';

    } else if (type === 'WEAKLY DESCENDING') {
        if (current > previous) type = 'RANDOM';
    }

    return [current, type];
}

process.stdin.on('data', data => {
    let result = getSequenceType(data);
    process.stdout.write(result);
    process.exit();
});
