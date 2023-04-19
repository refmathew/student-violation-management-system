const db = require('./connect');

let sql;

/* Create Student table */
sql = `CREATE TABLE Students( 
  StudentId VARCHAR(8) NOT NULL PRIMARY KEY, 
  LastName VARCHAR(20) NOT NULL, 
  FirstName VARCHAR(30) NOT NULL, 
  Course VARCHAR(8) NOT NULL, 
  Year VARCHAR(4) NOT NULL,
  RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)`

/* Create ViolationDesc table */
sql = `CREATE TABLE ViolationsDesc(
  Violation TEXT PRIMARY KEY NOT NULL,
  Number TEXT NOT NULL,
  IsMajor BOOLEAN NOT NULL CHECK (IsMajor IN (0, 1))
)`

/* Create Violations table */
sql = `CREATE TABLE Violations(
  Id INTEGER PRIMARY KEY,
  Violation TEXT NOT NULL,
  Guard VARCHAR(50) NOT NULL,
  Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  StudentId VARCHAR(8) NOT NULL, 
  FOREIGN KEY(StudentId) REFERENCES Students(StudentId),
  FOREIGN KEY(Violation) REFERENCES ViolationsDesc(Violation)
)`
// db.get("PRAGMA foreign_keys = ON")

/* Run query */
db.run(sql, (err) => {
  if (err) {
    console.log(err)
  }
});
