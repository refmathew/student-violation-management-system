const db = require('../db/connect');
const sql = 'INSERT INTO Student( StudentId, LastName, FirstName, Course, Year ) VALUES(?, ?, ?, ?, ?)';

const registerStudent = (req, res) => {
  const values = Object.values(req.body);
  let hasEmptyValue = false;

  values.forEach((value) => {
    if (!value) hasEmptyValue = true;
  })

  if (hasEmptyValue) {
    res.status(400).send({ success: false, message: "Please submit non empty fields" })
  }

  db.run(sql, values, (err, result) => {
    if (err) {
      if (err.errno === 19) res.status(400).send({ success: false, message: "Student Id already exists. Please report to the SADDO" })
    } else {
      res.status(200).send({ success: true, message: "Student succesfully registered" })
    }
  })
}

module.exports = { registerStudent }
