const db = require("../db/connect");
let sql;

const getStudentStatsQuery = (scope, query) => {
  let condition = "";

  switch (scope) {
    case "thisYear":
      condition = ' Violations.Timestamp > date("now", "start of year")';
      break;
    case "lastYear":
      condition =
        ' Violations.Timestamp > date("now", "start of year", "-1 years") AND Violations.Timestamp < date("now", "start of year")';
      break;
    case "allTime":
      condition = ' Violations.Timestamp < date("now", "start of year")';
      break;
  }
  return `
      SELECT 
        COUNT(Violations.Violation) AS count, 
        Violations.Violation AS violation,
        ViolationsDesc.IsMajor AS violationIsMajor,
        ViolationsDesc.Number AS violationNumber
      FROM 
        Violations 
      INNER JOIN
        ViolationsDesc
      ON
        Violations.Violation = ViolationsDesc.Violation
      JOIN 
        Students 
      ON 
        Violations.StudentId = Students.StudentId
      WHERE
        ${condition} AND 
        Students.StudentId LIKE '%${query}%'
      GROUP BY 
        Violations.Violation
      ORDER BY 
        count 
      DESC;
  `;
};

const getStudentDataThisYear = (req, res, next) => {
  db.all(getStudentStatsQuery("thisYear", req.query.query), [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, err: err });
    res.locals.thisYear = rows;
    next();
  });
};
const getStudentDataLastYear = (req, res, next) => {
  db.all(getStudentStatsQuery("lastYear", req.query.query), [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, err: err });
    res.locals.lastYear = rows;
    next();
  });
};
const getStudentDataAllTime = (req, res, next) => {
  db.all(getStudentStatsQuery("allTime", req.query.query), [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, err: err });
    res.status(200).send({
      success: true,
      data: {
        data: res.locals.violations,
        stats: {
          thisYear: res.locals.thisYear,
          lastYear: res.locals.lastYear,
          allTime: rows,
        },
      },
      hasMultipleStudents: false,
    });
  });
};

const checkQueryValidity = (req, res, next) => {
  const { query } = req.query;

  if (!query)
    return res
      .status(400)
      .send({ success: false, message: "Please provide non empty query" });

  next();
};

const findStudent = (req, res, next) => {
  const { query } = req.query;

  const sql = `
    SELECT 
      StudentId AS studentId,
      LastName AS lastName,
      FirstName AS firstName,
      Course AS course,
      Year AS year
    FROM 
      Students 
    WHERE 
      LastName 
    LIKE 
      '%${query}%' 
    OR 
      FirstName 
    LIKE 
      '%${query}%' 
    OR 
      StudentId 
    LIKE 
      '%${query}%'
    ORDER BY 
      LastName
    ASC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, err: err });

    if (rows.length < 1)
      return res
        .status(400)
        .send({
          success: false,
          message: "No student found matching the query",
        });

    if (rows.length > 1)
      return res
        .status(200)
        .send({ success: true, data: rows, hasMultipleStudents: true });

    next();
  });
};

const getStudentData = async (req, res, next) => {
  const { query } = req.query;

  sql = `
    SELECT 
      Students.StudentId AS studentId, 
      Students.LastName AS studentLastName, 
      Students.FirstName AS studentFirstName, 
      Students.Course AS studentCourse, 
      Students.Year AS studentYear,
      Violations.Violation AS violation,
      Violations.Timestamp AS violationTD,
      Violations.Guard AS violationGuard,
      ViolationsDesc.isMajor AS violationIsMajor
    FROM 
      Students 
    JOIN 
      Violations 
    ON 
      Students.StudentId = Violations.StudentId
    JOIN 
      ViolationsDesc
    ON 
      Violations.Violation = ViolationsDesc.Violation
    WHERE
      Students.StudentId 
    LIKE 
      '%${query}%'
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, err: err });
    res.locals.violations = rows;
    next();
  });
};

const recordViolation = async (req, res) => {
  const { studentId, violation, guard } = req.body;
  sql = "INSERT INTO Violations( StudentId, Violation, Guard ) VALUES(?, ?, ?)";

  db.run(sql, [studentId, violation, guard], (err, rows) => {
    if (err) {
      res.status(400).send({ err: err });
    } else {
      res.status(200).send({ success: true, message: "Violation Recorded" });
    }
  });
};

const register = (req, res) => {
  const values = Object.values(req.body);
  sql =
    "INSERT INTO Students( StudentId, LastName, FirstName, Course, Year ) VALUES(?, ?, ?, ?, ?)";

  db.run(sql, values, (err, result) => {
    if (err) {
      if (err.errno === 19)
        res
          .status(400)
          .send({
            success: false,
            message: "Student Id already exists. Please report to the SADDO",
          });
    } else {
      res
        .status(200)
        .send({ success: true, message: "Student succesfully registered" });
    }
  });
};

const getGuardList = (req, res) => {
  sql = `
    SELECT 
      firstname || ' ' || lastname AS name
    FROM 
      Guard;
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, message: err });
    res
      .status(200)
      .send({ success: true, message: "Guard list retrieved", data: rows });
  });
};

const getViolationList = (req, res) => {
  sql = `
    SELECT 
      Violation AS violation
    FROM 
      ViolationsDesc;
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, message: err });
    res
      .status(200)
      .send({ success: true, message: "Violation list retrieved", data: rows });
  });
};

module.exports = {
  checkQueryValidity,
  findStudent,
  getGuardList,
  getStudentData,
  getStudentDataThisYear,
  getStudentDataLastYear,
  getStudentDataAllTime,
  getViolationList,
  register,
  recordViolation,
};
