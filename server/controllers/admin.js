const _ = require('lodash');
const db = require('../db/connect.js');
let sql;

const getRecentViolations = (req, res) => {
  sql = 'SELECT Violations.Timestamp, Violations.StudentId, Students.FirstName, Students.LastName, Violations.Violation, Violations.Timestamp, Students.Course, Students.Year, Violations.Guard FROM Violations INNER JOIN Students ON Violations.StudentId = Students.StudentId ORDER BY datetime(Timestamp) DESC LIMIT 50';
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);

    const newRows = rows.map((row) => {
      const { Timestamp: timestamp, StudentId: studentId, FirstName: firstName, LastName: lastName, Violation: violation, Course: course, Year: year, Guard: guard, } = row;
      const name = `${firstName} ${lastName}`;
      return { timestamp, studentId, name, violation, course, year, guard };
    })

    res.status(200).send({ success: true, data: newRows });
  })

}

module.exports = { getRecentViolations }
