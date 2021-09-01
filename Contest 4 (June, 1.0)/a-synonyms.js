// A. Словарь синонимов

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// Вам дан словарь, состоящий из пар слов. Каждое слово является синонимом к 
// парному ему слову. Все слова в словаре различны. Для одного данного слова 
// определите его синоним.

// Формат ввода

// Программа получает на вход количество пар синонимов N. Далее следует N строк, 
// каждая строка содержит ровно два слова-синонима. После этого следует одно 
// слово.

// Формат вывода

// Программа должна вывести синоним к данному слову.

// Пример 1
// Ввод                 Вывод
// 3                    Bye
// Hello Hi
// Bye Goodbye
// List Array
// Goodbye

// Пример 2
// Ввод                 Вывод
// 1                    beep
// beep Car
// Car

// Пример 3
// Ввод                 Вывод
// 2                    1234567890
// Ololo Ololo
// Numbers 1234567890
// Numbers

// Язык: Node.js 14.15.5


function getSynonym(data) {
    const source = data.toString().trim().split('\n');

    const n = +source[0];
    const subject = source[n + 1];

    for (let i of source.slice(1, n + 1)) {
        let [word, synonym] = i.split(' ');
        if (subject === word) return synonym;
        if (subject === synonym) return word;
    }
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getSynonym(fileContent);

fs.writeFileSync('output.txt', result);
