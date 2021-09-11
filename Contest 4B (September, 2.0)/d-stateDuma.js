// D. Выборы Государственной Думы

// Ограничение времени                       2 секунды
// Ограничение памяти                        64Mb
// Ввод                                      стандартный ввод или input.txt
// Вывод                                     стандартный вывод или output.txt

// Статья 83 закона “О выборах депутатов Государственной Думы Федерального 
// Собрания Российской Федерации” определяет следующий алгоритм 
// пропорционального распределения мест в парламенте.

// Необходимо распределить 450 мест между партиями, участвовавших в выборах. 
// Сначала подсчитывается сумма голосов избирателей, поданных за каждую партию и 
// подсчитывается сумма голосов, поданных за все партии. Эта сумма делится на 
// 450, получается величина, называемая “первое избирательное частное” (смысл 
// первого избирательного частного - это количество голосов избирателей, которое 
// необходимо набрать для получения одного места в парламенте).

// Далее каждая партия получает столько мест в парламенте, чему равна целая 
// часть от деления числа голосов за данную партию на первое избирательное 
// частное.

// Если после первого раунда распределения мест сумма количества мест, отданных 
// партиям, меньше 450, то оставшиеся места передаются по одному партиям, в 
// порядке убывания дробной части частного от деления числа голосов за данную 
// партию на первое избирательное частное. Если же для двух партий эти дробные 
// части равны, то преимущество отдается той партии, которая получила большее 
// число голосов.

// Формат ввода

// На вход программе подается список партий, участвовавших в выборах. Каждая 
// строка входного файла содержит название партии (строка, возможно, содержащая 
// пробелы), затем, через пробел, количество голосов, полученных данной партией 
// – число, не превосходящее 10^8.

// Формат вывода

// Программа должна вывести названия всех партий и количество голосов в 
// парламенте, полученных данной партией. Названия необходимо выводить в том же 
// порядке, в котором они шли во входных данных.

// Пример 1
// Ввод                        Вывод
// Party One 100000            Party One 64
// Party Two 200000            Party Two 129
// Party Three 400000          Party Three 257

// Пример 2
// Ввод                        Вывод
// Party number one 100        Party number one 225
// Partytwo 100                Partytwo 225

// Пример 3
// Ввод                        Вывод
// Party number one 449        Party number one 449
// Partytwo 1                  Partytwo 1

// Язык: Node.js 14.15.5


function count(data) {
  const partyVotes = data.toString().trim().split('\n')
    .map(line => [
      line.slice(0, line.lastIndexOf(' ')),
      +line.slice(line.lastIndexOf(' ')),
    ]);

  const allVotes = partyVotes.reduce((a, b) => a + +b[1], 0);
  const quotient = allVotes / 450;

  const partySeats = new Object();
  let takenSeats = 0;
  const parties = [];
  const partyVotesDict = new Object();

  for (let i = 0; i < partyVotes.length; ++i) {
    const partyName = partyVotes[i][0]
    const votesCount = partyVotes[i][1]

    partyVotesDict[partyName] = votesCount;
    partySeats[partyName] = Math.floor(votesCount / quotient);
    takenSeats += partySeats[partyName];
    parties.push(partyName);
  }

  const sortedParties = parties.slice().sort((a, b) => {
    const aFraction =
      partyVotesDict[a] / quotient - Math.floor(partyVotesDict[a] / quotient);
    const bFraction =
      partyVotesDict[b] / quotient - Math.floor(partyVotesDict[b] / quotient);

    if (aFraction === bFraction) return partyVotesDict[b] - partyVotesDict[a];
    else return bFraction - aFraction;
  });

  let freeSeats = 450 - takenSeats;
  let i = 0;

  while (freeSeats) {
    ++partySeats[sortedParties[i++]];
    i %= parties.length;
    --freeSeats;
  }
  
  return Object.entries(partySeats).map(v => v.join(' ')).join('\n');
}

const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const result = count(fileContent);

fs.writeFileSync('output.txt', result + '');
