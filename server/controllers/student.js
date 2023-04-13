const db = require('../db/connect');
let sql;

const register = (req, res) => {
  const values = Object.values(req.body);
  sql = 'INSERT INTO Students( StudentId, LastName, FirstName, Course, Year ) VALUES(?, ?, ?, ?, ?)';

  db.run(sql, values, (err, result) => {
    if (err) {
      if (err.errno === 19) res.status(400).send({ success: false, message: "Student Id already exists. Please report to the SADDO" })
    } else {
      res.status(200).send({ success: true, message: "Student succesfully registered" })
    }
  })
}

const recordViolation = async (req, res) => {
  const { studentId, violation, guard } = req.body;
  console.log(req.body)
  sql = 'INSERT INTO Violations( StudentId, Violation, Guard ) VALUES(?, ?, ?)';

  db.run(sql, [studentId, violation, guard], (err, rows) => {
    if (err) {
      res.status(400).send({ err: err })
    } else {
      res.status(200).send({ success: true, message: "Violation Recorded" })
    }
  });
}


module.exports = { register, recordViolation };
