// G. Банковские счета

// Ограничение времени               1 секунда
// Ограничение памяти                64Mb
// Ввод                              стандартный ввод или input.txt
// Вывод                             стандартный вывод или output.txt

// Некоторый банк хочет внедрить систему управления счетами клиентов, 
// поддерживающую следующие операции:

// Пополнение счета клиента. Снятие денег со счета. Запрос остатка средств на 
// счете. Перевод денег между счетами клиентов. Начисление процентов всем 
// клиентам.

// Вам необходимо реализовать такую систему. Клиенты банка идентифицируются 
// именами (уникальная строка, не содержащая пробелов). Первоначально у банка 
// нет ни одного клиента. Как только для клиента проводится операция пололнения, 
// снятия или перевода денег, ему заводится счет с нулевым балансом. Все 
// дальнейшие операции проводятся только с этим счетом. Сумма на счету может 
// быть как положительной, так и отрицательной, при этом всегда является целым 
// числом.

// Формат ввода

// Входной файл содержит последовательность операций. Возможны следующие 
// операции: DEPOSIT name sum - зачислить сумму sum на счет клиента name. Если у 
// клиента нет счета, то счет создается. WITHDRAW name sum - снять сумму sum со 
// счета клиента name. Если у клиента нет счета, то счет создается. BALANCE name 
// - узнать остаток средств на счету клиента name. TRANSFER name1 name2 sum - 
// перевести сумму sum со счета клиента name1 на счет клиента name2. Если у 
// какого-либо клиента нет счета, то ему создается счет. INCOME p - начислить 
// всем клиентам, у которых открыты счета, p% от суммы счета. Проценты 
// начисляются только клиентам с положительным остатком на счету, если у клиента 
// остаток отрицательный, то его счет не меняется. После начисления процентов 
// сумма на счету остается целой, то есть начисляется только целое число 
// денежных единиц. Дробная часть начисленных процентов отбрасывается.

// Формат вывода

// Для каждого запроса BALANCE программа должна вывести остаток на счету данного 
// клиента. Если же у клиента с запрашиваемым именем не открыт счет в банке, 
// выведите ERROR.

// Пример 1
// Ввод
// DEPOSIT Ivanov 100
// INCOME 5
// BALANCE Ivanov
// TRANSFER Ivanov Petrov 50
// WITHDRAW Petrov 100
// BALANCE Petrov
// BALANCE Sidorov

// Вывод
// 105
// -50
// ERROR

// Пример 2
// Ввод
// BALANCE Ivanov
// BALANCE Petrov
// DEPOSIT Ivanov 100
// BALANCE Ivanov
// BALANCE Petrov
// DEPOSIT Petrov 150
// BALANCE Petrov
// DEPOSIT Ivanov 10
// DEPOSIT Petrov 15
// BALANCE Ivanov
// BALANCE Petrov
// DEPOSIT Ivanov 46
// BALANCE Ivanov
// BALANCE Petrov
// DEPOSIT Petrov 14
// BALANCE Ivanov
// BALANCE Petrov

// Вывод
// ERROR
// ERROR
// 100
// ERROR
// 150
// 110
// 165
// 156
// 165
// 156
// 179

// Пример 3
// Ввод
// BALANCE a
// BALANCE b
// DEPOSIT a 100
// BALANCE a
// BALANCE b
// WITHDRAW a 20
// BALANCE a
// BALANCE b
// WITHDRAW b 78
// BALANCE a
// BALANCE b
// WITHDRAW a 784
// BALANCE a
// BALANCE b
// DEPOSIT b 849
// BALANCE a
// BALANCE b

// Вывод
// ERROR
// ERROR
// 100
// ERROR
// 80
// ERROR
// 80
// -78
// -704
// -78
// -704
// 771

// Язык: Node.js 14.15.5


function solve(data) {
  const operations = data.toString().trim().split('\n')
    .map(line => line.split(' '));

  const output = [];
  const clients = {};

  for (let i = 0; i < operations.length; ++i) {
    let name, sum;

    switch (operations[i][0]) {
      case 'DEPOSIT':
        name = operations[i][1];
        sum = Math.trunc(Number(operations[i][2]));

        if (!clients[name]) clients[name] = 0;
        clients[name] += sum;
        break;

      case 'WITHDRAW':
        name = operations[i][1];
        sum = Math.trunc(Number(operations[i][2]));

        if (!clients[name]) clients[name] = 0;
        clients[name] -= sum;
        break;

      case 'BALANCE':
        name = operations[i][1];

        if (clients[name] !== undefined) output.push(clients[name]);
        else output.push('ERROR');
        break;

      case 'TRANSFER':
        const from = operations[i][1];
        const to = operations[i][2];
        sum = Math.trunc(Number(operations[i][3]));

        if (!clients[from]) clients[from] = 0;
        if (!clients[to]) clients[to] = 0;

        clients[from] = clients[from] - sum;
        clients[to] = clients[to] + sum;
        break;

      case 'INCOME':
        const interest = operations[i][1];

        for (let name in clients) {
          const balance = clients[name];

          if (balance > 0) {
            clients[name] = balance + Math.trunc(balance * interest / 100);
          }
        }
        break;
    }
  }

  return output.join('\n');
}

const fs = require('fs');
const content = fs.readFileSync('input.txt', 'utf8');
const result = solve(content);
fs.writeFileSync('output.txt', result + '');
