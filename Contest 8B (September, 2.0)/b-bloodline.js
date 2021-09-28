// B. Родословная: предки и потомки

// Ограничение времени               2 секунды
// Ограничение памяти                64Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// В генеалогическом древе у каждого человека, кроме родоначальника, есть ровно 
// один родитель.

// Каждом элементу дерева сопоставляется целое неотрицательное число, называемое 
// высотой. У родоначальника высота равна 0, у любого другого элемента высота на 
// 1 больше, чем у его родителя.

// Даны два элемента в дереве. Определите, является ли один из них потомком 
// другого.

// Формат ввода

// Программа получает на вход число элементов в генеалогическом древе N. Далее 
// следует N−1 строка, задающие родителя для каждого элемента древа, кроме 
// родоначальника. Каждая строка имеет вид имя_потомка имя_родителя.

// Далее до конца файла идут строки, содержащие имена двух элементов дерева.

// Формат вывода

// Для каждого такого запроса выведите одно из трех чисел: 1, если первый 
// элемент является предком второго, 2, если второй является предком первого или 
// 0, если ни один из них не является предком другого.

// Пример

// Ввод                          Вывод
// 9                             1 2 0
// Alexei Peter_I
// Anna Peter_I
// Elizabeth Peter_I
// Peter_II Alexei
// Peter_III Anna
// Paul_I Peter_III
// Alexander_I Paul_I
// Nicholaus_I Paul_I
// Anna Nicholaus_I
// Peter_II Peter_I
// Alexei Paul_I

// Язык: Node.js 14.15.5


function investigate(data) {
  data = data.toString().trim().split('\n').map(line => line.split(/\s+/));
  const n = +data[0];
  const relations = data.slice(1, n);
  const unknowns = data.slice(n);

  const bloodline = new Object();

  for (let i = 0; i < n - 1; ++i) {
    bloodline[relations[i][0]] = relations[i][1];
  }

  const result = [];

  for (let i = 0; i < unknowns.length; ++i) {
    if (isAncestor(unknowns[i][1], unknowns[i][0])) result.push(1);
    else if (isAncestor(unknowns[i][0], unknowns[i][1])) result.push(2);
    else result.push(0);
  }

  function isAncestor(descendant, ancestor) {
    let parent = bloodline[descendant];

    while (parent !== undefined) {
      if (parent === ancestor) return true;
      parent = bloodline[parent];
    }

    return false;
  }

  return result.join(' ');
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = investigate(fileContent);

fs.writeFileSync('output.txt', result);
