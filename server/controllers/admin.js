const _ = require('lodash');
const db = require('../db/connect.js');
let sql;

const getRecentViolations = (req, res) => {
  sql = 'SELECT * FROM Violations ORDER BY date(Timestamp) DESC LIMIT 50';
  db.all(sql, [], (err, rows) => {
    if (err) return console.err(err);

    const newRows = rows.map((row) => {
      const { Violation: violation, Guard: guard, Timestamp: timestamp, StudentId: studentid } = row;
      return { studentid, violation, timestamp, guard };
    })

    res.status(200).send({ success: true, data: newRows });
  })

}

module.exports = { getRecentViolations }
