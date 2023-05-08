const db = require('../db/connect');
let sql;

const authenticateUser = (req, res, next) => {
  sql = `
  SELECT
    lastname, firstname, isAdmin
  FROM 
    User
  WHERE 
    username LIKE "%${req.body.username}%" AND password LIKE "%${req.body.password}%";
`

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send({ succes: false, data: null, message: 'Server error' });

    rows < 1
      ? res.status(400).send({ success: false, data: null, message: 'No such user found' })
      : res.status(200).send({ success: true, data: rows });
  })
}

module.exports = {
  authenticateUser
}
