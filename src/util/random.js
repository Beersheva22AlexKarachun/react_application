const names = [
  { name: 'Alexander', gender: 'male' },
  { name: 'Emily', gender: 'female' },
  { name: 'Michael', gender: 'male' },
  { name: 'Emma', gender: 'female' },
  { name: 'William', gender: 'male' },
  { name: 'Olivia', gender: 'female' },
  { name: 'James', gender: 'male' },
  { name: 'Ava', gender: 'female' },
  { name: 'Benjamin', gender: 'male' },
  { name: 'Sophia', gender: 'female' },
  { name: 'Daniel', gender: 'male' },
  { name: 'Isabella', gender: 'female' },
  { name: 'Matthew', gender: 'male' },
  { name: 'Mia', gender: 'female' },
  { name: 'Joseph', gender: 'male' },
  { name: 'Charlotte', gender: 'female' },
  { name: 'David', gender: 'male' },
  { name: 'Abigail', gender: 'female' },
  { name: 'Andrew', gender: 'male' },
  { name: 'Harper', gender: 'female' },
  { name: 'John', gender: 'male' },
  { name: 'Amelia', gender: 'female' },
  { name: 'Ryan', gender: 'male' },
  { name: 'Evelyn', gender: 'female' },
  { name: 'Christopher', gender: 'male' },
  { name: 'Sofia', gender: 'female' },
  { name: 'Joshua', gender: 'male' },
  { name: 'Ella', gender: 'female' },
  { name: 'Anthony', gender: 'male' },
  { name: 'Avery', gender: 'female' }
];

const MAX_MONTH = 12
const MAX_DAY = 31

export function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min))
}

export function getRandomElement(array) {
  return array[getRandomInt(0, array.length)]
}

export function getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) {
  const { name, gender } = getRandomElement(names);
  const salary = Math.trunc(getRandomInt(minSalary, maxSalary) / 1000) * 1000;
  const year = getRandomInt(minYear, maxYear + 1);
  const month = getRandomInt(1, MAX_MONTH +1);
  const day = getRandomInt(1, MAX_DAY + 1);
  const birthDate = new Date(year, month, day);
  const department = getRandomElement(departments);

  return { name, birthDate, gender, salary, department }
}

export function getRandomMatrix(rows, columns, min, max) {
  return Array.from({ length: rows }).map(() => getRandomArray(columns, min, max))
}
export function getRandomArray(length, min, max) {
  return Array.from({ length: length }).map(() => getRandomInt(min, max))
}