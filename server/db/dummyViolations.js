const _ = require('lodash');
const db = require('./connect.js');

let sql = 'INSERT INTO Violations (StudentId, Violation, Guard, Timestamp) VALUES'

let studentIds = [];

const violations = [
  "Forgotten id",
  "Wearing flat shoes",
  "Wearing PE uniform",
  "Wearing white socks",
  "Colored undershirt",
  "Wearing freestyle clothing",
  "Colored hair",
  "Not wearing sando"
]

const guards = [
  "N/A",
  "Dario Fullion",
  "Iyrome Argao",
  "Jayson Verzo",
  "Melvin Boston",
  "Mercedita Abalona",
  "Reejay Ortega",
  "Remond Rivera",
  "Ronaldo Villacruel"
]


const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleString("en-PH", { timeZone: "Asia/Manila" })
}

db.all('SELECT StudentId from Students', (err, rows) => {
  err
    ? console.log(err)
    : studentIds = rows.map(row => row.StudentId)
})

const getRandomData = () => {
  let studentId = _.sample(studentIds);
  let violation = _.sample(violations);
  let guard = _.sample(guards);
  let timestamp = randomDate(new Date(2023, 0, 1), new Date());

  /* surround data with quotes for sql */
  let randomData = [studentId, violation, guard, timestamp];
  randomData = randomData.map(data => `"${data}"`);

  return randomData;
}

const amountOfData = 2048;

setTimeout(() => {
  for (let i = 0; i < amountOfData; i++) {
    let randomData = getRandomData();

    if (i === amountOfData - 1) {
      sql += `(${randomData.join(', ')})`
    } else {
      sql += `(${randomData.join(', ')}), `
    }
  }

  db.run(sql, (err) => {
    if (err) {
      console.log(err)
    }
  });
}, 4000);

