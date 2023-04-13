const db = require('../db/connect.js');

const authenticate = (req, res, next) => {
  const sql = `SELECT * FROM Students WHERE LastName LIKE '%${req.body.lastName}%' AND StudentId LIKE '%${req.body.studentId}%'`
  console.log(sql)

  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).send({ success: false, err: err })

    rows < 1
      ? res.status(400).send({ success: false, message: 'Last name and Student Id do not match.' })
      : next()
  });
}

module.exports = authenticate;
