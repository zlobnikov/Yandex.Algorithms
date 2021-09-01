// C. Дипломы

// Ограничение времени         1 секунда
// Ограничение памяти          64Mb
// Ввод                        стандартный ввод или input.txt
// Вывод                       стандартный вывод или output.txt

// Когда Петя учился в школе, он часто участвовал в олимпиадах по информатике, 
// математике и физике. Так как он был достаточно способным мальчиком и усердно 
// учился, то на многих из этих олимпиад он получал дипломы. К окончанию школы у 
// него накопилось n дипломов, причём, как оказалось, все они имели одинаковые 
// размеры: w — в ширину и h — в высоту. Сейчас Петя учится в одном из лучших 
// российских университетов и живёт в общежитии со своими одногруппниками. Он 
// решил украсить свою комнату, повесив на одну из стен свои дипломы за школьные 
// олимпиады. Так как к бетонной стене прикрепить дипломы достаточно трудно, то 
// он решил купить специальную доску из пробкового дерева, чтобы прикрепить её к 
// стене, а к ней — дипломы. Для того чтобы эта конструкция выглядела более 
// красиво, Петя хочет, чтобы доска была квадратной и занимала как можно меньше 
// места на стене. Каждый диплом должен быть размещён строго в прямоугольнике 
// размером w на h. Дипломы запрещается поворачивать на 90 градусов. 
// Прямоугольники, соответствующие различным дипломам, не должны иметь общих 
// внутренних точек. Требуется написать программу, которая вычислит минимальный 
// размер стороны доски, которая потребуется Пете для размещения всех своих 
// дипломов.

// Формат ввода

// Входной файл содержит три целых числа: w, h, n (1 ≤ w, h, n ≤ 10^9).

// Формат вывода

// В выходной файл необходимо вывести ответ на поставленную задачу.

// Пример
// Ввод            Вывод
// 2 3 10          9

// Язык: Node.js 14.15.5


function calcSize(data) {
    const [width, height, n] = data.toString().trim().split(' ').map(Number);

    let left = width;
    let right = n * Math.max(width, height);

    while (left < right) {
        let medium = Math.floor((left + right) / 2);

        if (checkBoard(medium, width, height, n)) right = medium;
        else left = medium + 1;
        // console.log(left, right, medium);
    }

    return left;
}

function checkBoard(boardSize, width, height, n) {
    const cols = Math.floor(boardSize / width);
    const rows = Math.ceil(n / cols);
    const commonHeight = rows * height;

    return boardSize >= commonHeight;
}


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = calcSize(fileContent);

fs.writeFileSync('output.txt', result + '');