// C. Кубики

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Аня и Боря любят играть в разноцветные кубики, причем у каждого из них свой 
// набор и в каждом наборе все кубики различны по цвету. Однажды дети 
// заинтересовались, сколько существуют цветов таких, что кубики каждого цвета 
// присутствуют в обоих наборах. Для этого они занумеровали все цвета случайными 
// числами. На этом их энтузиазм иссяк, поэтому вам предлагается помочь им в 
// оставшейся части. Номер любого цвета — это целое число в пределах от 0 до 
// 109.

// Формат ввода

// В первой строке входного файла записаны числа N и M — количество кубиков у 
// Ани и Бори соответственно. В следующих N строках заданы номера цветов кубиков 
// Ани. В последних M строках номера цветов кубиков Бори.

// Формат вывода

// Выведите сначала количество, а затем отсортированные по возрастанию номера 
// цветов таких, что кубики каждого цвета есть в обоих наборах, затем количество 
// и отсортированные по возрастанию номера остальных цветов у Ани, потом 
// количество и отсортированные по возрастанию номера остальных цветов у Бори.

// Пример 1
// Ввод	        Вывод
// 4 3          2
// 0            0 1
// 1            2
// 10           9 10
// 9            1
// 1            3
// 3
// 0

// Пример 2
// Ввод	        Вывод
// 2 2          1
// 1            2
// 2            1
// 2            1
// 3            1
//              3

// Пример 3
// Ввод	        Вывод
// 0 0          0

//              0

//              0

// Язык: Node.js 14.15.5


function compareCubes(data) {
    const source = data.toString().trim().split('\n');
    const [annCubes, borisCubes] = source[0].split(' ').map(Number);
    const annColors = new Set(source.slice(1, annCubes + 1));
    const borisColors = new Set(source.slice(annCubes + 1))

    const commonColors = intersection(annColors, borisColors);
    const onlyAnnColors = difference(annColors, borisColors);
    const onlyBorisColors = difference(borisColors, annColors);

    let result = [
        commonColors.length,
        commonColors.join(' '),
        onlyAnnColors.length,
        onlyAnnColors.join(' '),
        onlyBorisColors.length,
        onlyBorisColors.join(' ')
    ].join('\n');

    return result;
}

function intersection(set1, set2) {
    return [...set1].filter(a => set2.has(a)).sort((a, b) => a - b);
}

function difference(set1, set2) {
    return [...set1].filter(a => !set2.has(a)).sort((a, b) => a - b);
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = compareCubes(fileContent);

fs.writeFileSync('output.txt', result);
