// C. Туризм

// Ограничение времени      1 секунда
// Ограничение памяти       64Mb
// Ввод                     стандартный ввод или input.txt
// Вывод                    стандартный вывод или output.txt

// Александр недавно увлекся горным туризмом. Ему уже надоело покорять отдельные 
// горные пики, и он собирается покорить самую настоящую горную цепь!

// Напомним, что Александр живет в плоском мире. Горная цепь состоит из 
// отрезков, соединяющих точки на плоскости, каждая из которых находится строго 
// правее предыдущей (x-координата следующей точки больше, чем у предыдущей). 
// Трассой на горной цепи называется её часть между двумя фиксированными концами 
// отрезков.

// Участок, на котором при движении по трассе координата y (высота) всегда 
// возрастает, называется подъемом, величиной подъема называется разность высот 
// между начальной и конечной точками участка.

// Туристическая компания предлагает на выбор несколько трасс на одной горной 
// цепи. Александр из-за финансовых трудностей может выбрать для поездки только 
// одну из этих трасс. Вы решили помочь ему с выбором. Александру важно для 
// каждой трассы определить суммарную высоту подъемов на ней. Обратите внимание, 
// что трасса может идти как слева-направо, так и справа-налево.

// Формат ввода

// В первой строке входного файла содержится единственное число N — количество 
// точек ломаной, задающей горную цепь (1 ≤ N ≤ 30 000). Далее в N строках 
// содержатся описания точек, каждое из которых состоит из двух целых чисел, xi 
// и yi (1 ≤ xi, yi ≤ 30 000).

// В следующей строке находится число M — количество трасс (1 ≤ M ≤ 30 000).

// Далее в M строках содержатся описания трасс. Каждое описание представляет 
// собой два целых числа, si и fi, они обозначают номера вершин начала и конца 
// трассы, соответственно (1 ≤ si ≤ N, 1 ≤ fi ≤ N). Начало и конец трассы могут 
// совпадать.

// Гарантируется, что во входном файле задана именно горная цепь.

// Формат вывода

// Для каждой трассы выведите одно число — суммарную высоту подъемов на данной 
// трассе.

// Пример 1
// Ввод             Вывод
// 7                4
// 2 1
// 4 5
// 7 4
// 8 2
// 9 6
// 11 3
// 15 3
// 1
// 2 6

// Пример 2
// Ввод             Вывод
// 6                0
// 1 1              5
// 3 2              4
// 5 6
// 7 2
// 10 4
// 11 1
// 3
// 5 6
// 1 4
// 4 2

// Язык: Node.js 14.15.5


function calcHeight(data) {
    const source = data.toString().trim().split('\n');

    const n = +source[0];
    const mountainChain = source.slice(1, n + 1)
        .map(a => a.split(' ').map(Number));

    const m = +source[n + 1];
    const routes = source.slice(n + 2)
        .map(a => a.split(' ').map(Number));

    let toRight = calcHeightToRight(mountainChain, n);
    let toLeft = calcHeightToLeft(mountainChain, n);

    let result = [];

    for (let i = 0; i < m; ++i) {
        let [start, finish] = routes[i].map(a => a - 1);

        if (start <= finish) result.push(toRight[finish] - toRight[start]);
        else result.push(toLeft[finish] - toLeft[start]);
    }

    return result;
}

function calcHeightToRight(mountainChain, n) {
    let toRight = Array(n).fill(0);
    let y = mountainChain[0][1];

    for (let i = 1; i < n; ++i) {
        let previousY = y;
        y = mountainChain[i][1];

        if (y > previousY) {
            toRight[i] = toRight[i - 1] + y - previousY;
        } else {
            toRight[i] = toRight[i - 1];
        }
    }

    return toRight;
}

function calcHeightToLeft(mountainChain, n) {
    let toLeft = Array(n).fill(0);
    let y = mountainChain[n - 1][1];

    for (let i = n - 2; i >= 0; --i) {
        let previousY = y;
        y = mountainChain[i][1];

        if (y > previousY) {
            toLeft[i] = toLeft[i + 1] + y - previousY;
        } else {
            toLeft[i] = toLeft[i + 1];
        }
    }

    return toLeft;
}

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = calcHeight(fileContent);

fs.writeFileSync('output.txt', result.join('\n'));
