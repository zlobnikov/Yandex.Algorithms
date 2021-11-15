// A. Угадай число - 2

// Ограничение времени                   1 секунда
// Ограничение памяти                    64Mb
// Ввод                                  стандартный ввод или input.txt
// Вывод                                 стандартный вывод или output.txt

// Август загадал натуральное число от 1 до n. Беатриса пытается угадать это 
// число, для этого она называет некоторые множества натуральных чисел. Август 
// отвечает Беатрисе YES, если среди названных ей чисел есть задуманное или NO в 
// противном случае. После нескольких заданных вопросов Беатриса запуталась в 
// том, какие вопросы она задавала и какие ответы получила и просит вас помочь 
// ей определить, какие числа мог задумать Август.

// Август и Беатриса продолжают играть в игру, но Август начал жульничать. На 
// каждый из вопросов Беатрисы он выбирает такой вариант ответа YES или NO, 
// чтобы множество возможных задуманных чисел оставалось как можно больше. 
// Например, если Август задумал число от 1 до 5, а Беатриса спросила про числа 
// 1 и 2, то Август ответит NO, а если Беатриса спросит про 1, 2, 3, то Август 
// ответит YES. Если же Бетриса в своем вопросе перечисляет ровно половину из 
// задуманных чисел, то Август из вредности всегда отвечает NO. Наконец, Август 
// при ответе учитывает все предыдущие вопросы Беатрисы и свои ответы на них, то 
// есть множество возможных задуманных чисел уменьшается.

// Формат ввода

// Вам дана последовательность вопросов Беатрисы. Приведите ответы Августа на 
// них. Первая строка входных данных содержит число n — наибольшее число, 
// которое мог загадать Август. Далее идут строки, содержащие вопросы Беатрисы. 
// Каждая строка представляет собой набор чисел, разделенных пробелами. 
// Последняя строка входных данных содержит одно слово HELP.

// Формат вывода

// Для каждого вопроса Беатрисы выведите ответ Августа на этот вопрос. После 
// этого выведите (через пробел, в порядке возрастания) все числа, которые мог 
// загадать Август после ответа на все вопросы Беатрисы.

// Пример 1
// Ввод                    Вывод
// 10                      NO
// 1 2 3 4 5               YES
// 2 4 6 8 10              6 8 10
// HELP

// Пример 2
// Ввод                    Вывод
// 10                      NO
// 1                       NO
// 2                       NO
// 3                       NO
// 4                       NO
// 5                       NO
// 6                       NO
// 7                       NO
// 8                       NO
// 9                       10
// HELP

// Пример 3
// Ввод                    Вывод
// 16                      NO
// 1 2 3 4 5 6 7 8         NO
// 9 10 11 12              NO
// 13 14                   NO
// 16                      15
// HELP

// Язык: Node.js 14.15.5


function solve(data) {
  data = data.toString().trim().split('\n');
  const n = Number(data[0]);

  const answers = [];
  const no = new Set();
  let yes = new Set();

  for (let i = 1; i <= n; ++i) {
    yes.add(i);
  }

  for (let i = 1; i < data.length - 1; ++i) {
    const numbers = new Set(data[i]
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter(v => yes.has(v) && !no.has(v))
    );

    if (numbers.size > yes.size / 2) {
      answers.push('YES');
      yes = numbers;

    } else {
      answers.push('NO');
      for (let v of numbers) {
        no.add(v);
        yes.delete(v);
      }
    }
  }

  return answers.join('\n') + '\n' + [...yes]
    .sort((a, b) => a - b)
    .join(' ');
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
