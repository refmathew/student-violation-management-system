const db = require('./connect');

// const sql = `CREATE TABLE Student(
// StudentId VARCHAR(8) NOT NULL PRIMARY,
// LastName VARCHAR(20) NOT NULL,
// FirstName VARCHAR(30) NOT NULL,
// Course VARCHAR(8) NOT NULL,
// Year VARCHAR(4) NOT NULL
// )`
const sql = `CREATE TABLE Student( 
  StudentId VARCHAR(8) NOT NULL PRIMARY KEY, 
  LastName VARCHAR(20) NOT NULL, 
  FirstName VARCHAR(30) NOT NULL, 
  Course VARCHAR(8) NOT NULL, 
  Year VARCHAR(4) NOT NULL
)`


db.run(sql)
