const db = require('../../db/connect.js');

const authenticate = (req, res, next) => {
  const { query } = req.query;
  console.log(req)

  const sql = `SELECT * FROM Students WHERE LastName LIKE '%${query}%' OR StudentId LIKE '%${query}%' OR StudentId LIKE '%${query}%'`

  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).send({ success: false, err: err })

    if (rows < 1) res.status(400).send({ success: false, message: 'No student found matching the query' });

    if (rows > 1) res.status(200).send({ success: true, moreThanOne: true, rows: rows })
  });
}
