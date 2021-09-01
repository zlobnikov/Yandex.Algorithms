// B. Дома и магазины

// Ограничение времени                 1 секунда
// Ограничение памяти                  64Mb
// Ввод                                стандартный ввод или input.txt
// Вывод                               стандартный вывод или output.txt

// На Новом проспекте построили подряд 10 зданий. Каждое здание может быть либо 
// жилым домом, либо магазином, либо офисным зданием.

// Но оказалось, что жителям некоторых домов на Новом проспекте слишком далеко 
// приходится идти до ближайшего магазина. Для разработки плана развития 
// общественного транспорта на Новом проспекте мэр города попросил вас выяснить, 
// какое же наибольшее расстояние приходится преодолевать жителям Нового 
// проспекта, чтобы дойти от своего дома до ближайшего магазина.

// Формат ввода

// Программа получает на вход десять чисел, разделенных пробелами. Каждое число 
// задает тип здания на Новом проспекте: число 1 обозначает жилой дом, число 2 
// обозначает магазин, число 0 обозначает офисное здание. Гарантируется, что на 
// Новом проспекте есть хотя бы один жилой дом и хотя бы один магазин.

// Формат вывода

// Выведите одно целое число: наибольшее расстояние от дома до ближайшего к нему 
// магазина. Расстояние между двумя соседними домами считается равным 1 (то есть 
// если два дома стоят рядом, то между ними расстояние 1, если между двумя 
// домами есть еще один дом, то расстояние между ними равно 2 и т.д.)

// Пример
// Ввод                      Вывод
// 2 0 1 1 0 1 0 2 1 2       3

// Примечания
// В примере из условия дальше всего идти до ближайшего магазина жителям 
// четвертого дома: ближайший к их дому магазин находится в первом доме, и им 
// нужно пройти три дома до него. Жителям других домов придется пройти меньшее 
// расстояние до ближайшего магазина, поэтому ответ 3.

// Язык: Node.js 14.15.5


function findMaxDistance(data) {
  const buildings = data.toString().trim().split(/\s+/).map(Number);

  const distances = [];
  let distance = Infinity;
  let maxDistance = 0;

  for (let i = 0; i < buildings.length; ++i) {
    if (buildings[i] === 1) {
      ++distance;
      distances.push(distance);
    } else if (buildings[i] === 2) {
      distance = 0;
    } else if (buildings[i] === 0) {
      ++distance;
    }
  }

  distance = Infinity;

  for (let i = buildings.length - 1; i >= 0; --i) {
    if (buildings[i] === 1) {
      ++distance;
      let [a, b] = [distance, distances.pop()];
      maxDistance = Math.max(maxDistance, Math.min(a, b));
    } else if (buildings[i] === 2) {
      distance = 0;
    } else if (buildings[i] === 0) {
      ++distance;
    }
  }

  return maxDistance;
}

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const result = findMaxDistance(fileContent);
fs.writeFileSync('output.txt', result + '');