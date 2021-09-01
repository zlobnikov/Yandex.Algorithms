// B. Номер появления слова

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// Во входном файле (вы можете читать данные из файла input.txt) записан текст. 
// Словом считается последовательность непробельных символов идущих подряд, 
// слова разделены одним или большим числом пробелов или символами конца строки. 
// Для каждого слова из этого текста подсчитайте, сколько раз оно встречалось в 
// этом тексте ранее.

// Формат ввода

// Вводится текст.

// Формат вывода

// Выведите ответ на задачу.

// Пример 1
// Ввод
// one two one tho three
// Вывод
// 0 0 1 0 0 

// Пример 2
// Ввод
// She sells sea shells on the sea shore;
// The shells that she sells are sea shells I'm sure.
// So if she sells sea shells on the sea shore,
// I'm sure that the shells are sea shore shells.
// Вывод
// 0 0 0 0 0 0 1 0 0 1 0 0 1 0 2 2 0 0 0 0 1 2 3 3 1 1 4 0 1 0 1 2 4 1 5 0 0

// Пример 3
// Ввод
// aba aba; aba @?"
// Вывод
// 0 0 1 0 

// Язык: Node.js 14.15.5


function countOccurrence(data) {
    const source = data.toString().trim().split(/[ \n]+/);
    if (source[0] === '') return [];

    let words = {};
    let result = [];

    for (let i of source) {
        words[i] = ++words[i] || 0;
        result.push(words[i]);
    }

    return result;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = countOccurrence(fileContent);

fs.writeFileSync('output.txt', result.join(' '));
