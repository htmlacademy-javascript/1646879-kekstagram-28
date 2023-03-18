// ДЗ 1
// Проверка длины строки
const checkString = (string, number) => string.length <= number;
checkString('проверяемая строка', 20);

// ДЗ 2-3
// Проверка являются ли входные данные строкой
const createString = (date) => {
  let string;
  if (typeof date !== 'string') {
    string = date.toString();
  } else {
    string = date;
  }
  return string;
};
// Проверка на палиндром
const isPalindrome = (date) => {
  const string = createString(date);
  const arr = string.toLowerCase().split('');
  const newArr = arr.filter((id) => id !== ' ');
  return (newArr.join('') === newArr.reverse().join(''));
};
isPalindrome(121);
isPalindrome('Лёша на полке клопа нашёл ');
// Ф-ция для извлечения чисел из строки
const isNumber = (date, number) => {
  const string = createString(date);
  let newString = '';
  for (const id in string) {
    if (!isNaN(parseInt(string[id], number))) {
      newString += string[id];
    }
  }
  return parseInt(newString, number);
};
isNumber('1 кефир, 0.5 батона', 10);
isNumber(-1, 10);

// ДЗ 4
const padStart = (string, length, pad) => {
  if (string.length >= length) {
    return string;
  } else {
    const diff = length - string.length;
    return pad.slice(0, diff % pad.length) + pad.repeat(diff / pad.length) + string;
  }
};
padStart('q', 4, 'we');
