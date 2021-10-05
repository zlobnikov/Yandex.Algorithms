// C. Родословная: LCA

// Ограничение времени                 2 секунды
// Ограничение памяти                  64Mb
// Ввод                                стандартный ввод или input.txt
// Вывод                               стандартный вывод или output.txt

// В генеалогическом древе определите для двух элементов их наименьшего общего 
// предка. Наименьшим общим предком элементов A и B является такой элемент C, 
// что С является предком A, C является предком B, при этом глубина C является 
// наибольшей из возможных. При этом элемент считается своим собственным 
// предком.

// Формат ввода

// Формат входных данных аналогичен предыдущей задаче.

// Формат вывода

// Для каждого запроса выведите наименьшего общего предка данных элементов.

// Пример
// Ввод                            Вывод
// 9                               Paul_I
// Alexei Peter_I                  Peter_I
// Anna Peter_I                    Anna
// Elizabeth Peter_I
// Peter_II Alexei
// Peter_III Anna
// Paul_I Peter_III
// Alexander_I Paul_I
// Nicholaus_I Paul_I
// Alexander_I Nicholaus_I
// Peter_II Paul_I
// Alexander_I Anna

// Язык: Node.js 14.15.5


function investigate(data) {
  data = data.toString().trim().split('\n').map(line => line.split(/\s+/));

  const n = +data[0];
  const relations = data.slice(1, n);
  const unknowns = data.slice(n);

  const bloodline = new Object();
  const result = [];

  for (let i = 0; i < n - 1; ++i) {
    bloodline[relations[i][0]] = relations[i][1];
  }

  for (let i = 0; i < unknowns.length; ++i) {
    const ancestors = new Set([unknowns[i][0]]);
    let parent = bloodline[unknowns[i][0]];

    while (parent !== undefined) {
      ancestors.add(parent);
      parent = bloodline[parent];
    }

    let element = unknowns[i][1];

    while (element !== undefined) {
      if (ancestors.has(element)) break;
      element = bloodline[element];
    }

    result.push(element);
  }

  return result.join('\n');
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = investigate(fileContent);

fs.writeFileSync('output.txt', result);
