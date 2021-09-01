// E. Скорая помощь

// Ограничение времени	    1 секунда
// Ограничение памяти	    64Mb
// Ввод	                    стандартный ввод или input.txt
// Вывод	                стандартный вывод или output.txt

// Бригада скорой помощи выехала по вызову в один из отделенных районов. К 
// сожалению, когда диспетчер получил вызов, он успел записать только адрес дома 
// и номер квартиры K1, а затем связь прервалась. Однако он вспомнил, что по 
// этому же адресу дома некоторое время назад скорая помощь выезжала в квартиру 
// K2, которая расположена в подъезда P2 на этаже N2. Известно, что в доме M 
// этажей и количество квартир на каждой лестничной площадке одинаково. Напишите 
// программу, которая вычилсяет номер подъезда P1 и номер этажа N1 квартиры K1.

// Формат ввода

// Во входном файле записаны пять положительных целых чисел K1, M, K2, P2, N2. 
// Все числа не превосходят 10 ** 6.

// Формат вывода

// Выведите два числа P1 и N1. Если входные данные не позволяют однозначно 
// определить P1 или N1, вместо соответствующего числа напечатайте 0. Если 
// входные данные противоречивы, напечатайте два числа –1 (минус один).

// Пример 1
// Ввод	                Вывод
// 89 20 41 1 11        2 3

// Пример 2
// Ввод	                Вывод
// 11 1 1 1 1           0 1

// Пример 3
// Ввод	                Вывод
// 3 2 2 2 1            -1 -1

// Язык: Node.js 14.15.5


function getAddress(data) {
    const [k1, m, k2, p2, n2] = data.toString().trim().split(' ').map(n => +n);

    let minFloorAparts = Math.ceil(k2 / ((p2 - 1) * m + n2));
    let maxFloorAparts = Math.floor((k2 - 1) / ((p2 - 1) * m + n2 - 1));

    let p1 = Math.ceil(k1 / (minFloorAparts * m));
    let n1 = Math.ceil(k1 / minFloorAparts) - (p1 - 1) * m;

    if (!basicCheck(k2, minFloorAparts, m, p2, n2)) return [-1, -1];
    if (p2 === 1 && n2 === 1) return extremeCases(k1, k2, m);

    if (!isFloorDefined(k1, minFloorAparts, maxFloorAparts, m)) n1 = 0;
    if (!isEntranceDefined(k1, minFloorAparts, maxFloorAparts, m)) p1 = 0;

    return [p1, n1];
}

function basicCheck(k, floorAparts, m, p, n) {
    if (n > m ||
        k <= floorAparts * (m * (p - 1) + n - 1) ||
        k > floorAparts * (m * (p - 1) + n)) {
            return false;
    } else return true;
}

function extremeCases(k1, k2, m) {
    if (k1 <= k2) return [1, 1];
    else if (m === 1) return [0, 1];
    else if (k1 <= k2 * m) return [1, 0];
    else return [0, 0];
}

function isFloorDefined(k, minFloorAparts, maxFloorAparts, m) {
    let floor = Math.ceil(k % (minFloorAparts * m) / minFloorAparts);
    for (let i = minFloorAparts + 1; i <= maxFloorAparts; ++i) {
        if (floor !== Math.ceil(k % (i * m) / i)) return false;
    }
    return true;
}

function isEntranceDefined(k, minFloorAparts, maxFloorAparts, m) {
    let maxEntrance = Math.ceil(k / (minFloorAparts * m));
    let minEntrance = Math.ceil(k / (maxFloorAparts * m));
    return maxEntrance === minEntrance;
}

process.stdin.on('data', data => {
    const result = getAddress(data);
    process.stdout.write(result.join(' '));
    process.exit();
});
