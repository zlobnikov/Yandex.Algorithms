// C. Самое частое слово

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// Дан текст. Выведите слово, которое в этом тексте встречается чаще всего. Если 
// таких слов несколько, выведите то, которое меньше в лексикографическом 
// порядке.

// Формат ввода

// Вводится текст.

// Формат вывода

// Выведите ответ на задачу.

// Пример 1
// Ввод                                                    Вывод
// apple orange banana banana orange                       banana

// Пример 2
// Ввод                                                    Вывод
// oh you touch my tralala mmm my ding ding dong           ding

// Пример 3
// Ввод                                                    Вывод
// q w e r t y u i o p                                     a
// a s d f g h j k l
// z x c v b n m

// Язык: Node.js 14.15.5


function getWord(data) {
    const source = data.toString().trim().split(/[ \n]+/);

    const words = countWords(source);
    const maxFreqeuncy = getMaxFrequency(words);

    let frequentWords = [];
    for (let word in words) {
        if (words[word] === maxFreqeuncy) frequentWords.push(word);
    }

    return frequentWords.sort()[0];
}

function countWords(source) {
    let words = {};
    for (let word of source) {
        words[word] = ++words[word] || 0;
    }
    return words;
}

function getMaxFrequency(words) {
    let result = 0;
    for (let key in words) {
        if (words[key] > result) result = words[key];
    }
    return result;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getWord(fileContent);

fs.writeFileSync('output.txt', result);
