// I. Полиглоты

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// Каждый из N школьников некоторой школы знает Mi языков. Определите, какие 
// языки знают все школьники и языки, которые знает хотя бы один из школьников.

// Формат ввода

// Первая строка входных данных содержит количество школьников N. Далее идет N 
// чисел Mi, после каждого из чисел идет Mi строк, содержащих названия языков, 
// которые знает i-й школьник. Длина названий языков не превышает 1000 символов, 
// количество различных языков не более 1000. 1 ≤ N ≤ 1000, 1 ≤ Mi ≤ 500.

// Формат вывода

// В первой строке выведите количество языков, которые знают все школьники. 
// Начиная со второй строки - список таких языков. Затем - количество языков, 
// которые знает хотя бы один школьник, на следующих строках - список таких 
// языков.

// Пример
// Ввод             Вывод
// 3                1
// 3                English
// Russian          3
// English          Russian
// Japanese         Japanese
// 2                English
// Russian     
// English     
// 1
// English

// Язык: Node.js 14.15.5


function getKnownLanguages(data) {
    const source = data.toString().trim().split('\n');
    let m = +source[1];
    let languages = new Set(source.slice(2, 2 + m));

    let allKnow = new Set(languages);
    let atLeastOneKnows = new Set(languages);

    for (let i = 2 + m; i < source.length;) {
        m = +source[i];
        languages = new Set(source.slice(i + 1, i + m + 1));

        allKnow = intersection(allKnow, languages);
        union(atLeastOneKnows, languages);

        i = i + m + 1;
    }

    return formatResult(allKnow, atLeastOneKnows);
}

function intersection(a, b) {
    let result = new Set();

    for (let i of a) {
        if (b.has(i)) {
            result.add(i);
        }
    }

    return result;
}

function union(a, b) {
    for (let i of b) {
        a.add(i);
    }

    return a;
}

function formatResult(a, b) {
    return [
        a.size,
        [...a].join('\n'),
        b.size,
        [...b].join('\n')
    ].join('\n');
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getKnownLanguages(fileContent);

fs.writeFileSync('output.txt', result);
