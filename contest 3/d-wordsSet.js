// D. Количество слов в тексте

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Во входном файле (вы можете читать данные из sys.stdin, подключив библиотеку 
// sys) записан текст. Словом считается последовательность непробельных символов 
// идущих подряд, слова разделены одним или большим числом пробелов или 
// символами конца строки. Определите, сколько различных слов содержится в этом 
// тексте.

// Формат ввода

// Вводится текст.

// Формат вывода

// Выведите ответ на задачу.

// Пример
// Ввод	                                                        Вывод
// She sells sea shells on the sea shore;                       19
// The shells that she sells are sea shells I'm sure.
// So if she sells sea shells on the sea shore,
// I'm sure that the shells are sea shore shells.

// Язык: Node.js 14.15.5


function countDifferentWords(data) {
    const source = data.toString().trim();
    if (source === '') return 0
    return (new Set(source.split(/[ \n]+/))).size;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = countDifferentWords(fileContent);

fs.writeFileSync('output.txt', result + '');
