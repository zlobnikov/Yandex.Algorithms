// E. Красота превыше всего

// Ограничение времени          2 секунды
// Ограничение памяти           64Mb
// Ввод                         стандартный ввод или input.txt
// Вывод                        стандартный вывод или output.txt

// В парке города Питсбурга есть чудесная аллея, состоящая из N посаженных в 
// один ряд деревьев, каждое одного из K сортов. В связи с тем, что Питсбург 
// принимает открытый чемпионат Байтландии по программированию, было решено 
// построить огромную арену для проведения соревнований. Так, согласно этому 
// плану вся аллея подлежала вырубке. Однако министерство деревьев и кустов 
// воспротивилось этому решению, и потребовало оставить некоторые из деревьев в 
// покое. Согласно новому плану строительства все деревья, которые не будут 
// вырублены, должны образовывать один непрерывный отрезок, являющийся 
// подотрезком исходного. Каждого из K видов деревьев требуется сохранить хотя 
// бы по одному экземпляру. На вас возложена задача найти отрезок наименьшей 
// длины, удовлетворяющий указанным ограничениям.

// Формат ввода

// В первой строке входного файла находятся два числа N и K (1 ≤ N, K ≤ 250000). 
// Во второй строке входного файла следуют N чисел (разделенных пробелами), i-ое 
// число второй строки задает цвет i-ого слева дерева в аллее. Гарантируется, 
// что присутствует хотя бы одно дерево каждого цвета

// Формат вывода

// В выходной файл выведите два числа, координаты левого и правого концов 
// отрезка минимальной длины, удовлетворяющего условию. Если оптимальных ответов 
// несколько, выведите любой.

// Пример 1
// Ввод            Вывод
// 5 3             2 4
// 1 2 1 3 2

// Пример 2
// Ввод            Вывод
// 6 4             2 6
// 2 4 2 3 3 1

// Язык: Node.js 14.15.5


function getSegment(data) {
    console.log(data);
    const source = data.toString().trim().split('\n')
        .map(a => a.split(' ').map(Number));

    const [[n, k], trees] = source;
    
    let segment = [1, n];
    let minLength = n;

    let availableColors = new Set([trees[0]]);
    let segmentTrees = {[trees[0]]: 1};

    let left = 0;
    let right = 0;

    while (true) {
        while (right < n - 1 && availableColors.size < k) {
            ++right;
            availableColors.add(trees[right]);
            segmentTrees[trees[right]] = segmentTrees[trees[right]] + 1 || 1;
        }

        if (availableColors.size < k) break;

        for(; availableColors.size === k; ++left) {
            let length = right - left + 1;

            if (length < minLength) {
                minLength = length;
                segment = [left + 1, right + 1];

                if (minLength === k) return segment;
            }

            --segmentTrees[trees[left]];
            if (!segmentTrees[trees[left]]) availableColors.delete(trees[left]);
        }
    }

    return segment;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = getSegment(fileContent);

fs.writeFileSync('output.txt', result.join(' '));
