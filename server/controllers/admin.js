const { format } = require('date-fns');
const _ = require('lodash');
const db = require('../db/connect.js');
let sql;

const getRecentViolations = (req, res) => {
  sql = `
    SELECT 
      Violations.Timestamp, 
      Violations.StudentId, 
      Students.FirstName, 
      Students.LastName, 
      Violations.Violation, 
      Violations.Timestamp, 
      Students.Course, 
      Students.Year, 
      Violations.Guard 
    FROM 
      Violations 
    INNER JOIN 
      Students 
    ON 
      Violations.StudentId = Students.StudentId 
    ORDER BY 
      datetime(Timestamp) 
    DESC LIMIT 
      50
  `;
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

const getViolationStatsWeek = (req, res, next) => {
  const weekAgo = format(Date.now() - 7 * 24 * 60 * 60 * 1000, `yyyy-MM-dd`);

  sql = `
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
    WHERE
      Violations.Timestamp > date('${weekAgo}')
    GROUP BY 
      Violations.Violation
    ORDER BY 
      count 
    DESC;
  `

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.week = rows
    next()
  })
}

const getViolationStatsMonth = (req, res, next) => {
  const monthAgo = format(Date.now() - 30 * 24 * 60 * 60 * 1000, `yyyy-MM-dd`);

  sql = `
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
    WHERE
      Violations.Timestamp > date('${monthAgo}')
    GROUP BY 
      Violations.Violation
    ORDER BY 
      count 
    DESC;
  `

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.month = rows;
    next()
  })
}

const getViolationStatsYear = (req, res, next) => {
  const yearAgo = format(Date.now() - 365 * 24 * 60 * 60 * 1000, `yyyy-MM-dd`);

  sql = `
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
    WHERE
      Violations.Timestamp > date('${yearAgo}')
    GROUP BY 
      Violations.Violation
    ORDER BY 
      count 
    DESC;
  `

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);

    res.status(200).send({ success: true, data: { week: res.locals.week, month: res.locals.month, year: rows } });
  })
}

const getCourseAndYearStatsWeek = (req, res, next) => {
  const weekAgo = format(Date.now() - 7 * 24 * 60 * 60 * 1000, `yyyy-MM-dd`);

  sql = `
    SELECT 
      Students.Course as studentCourse,
      Students.Year as studentYear,
      COUNT(Violations.Violation) AS violationCount, 
      Violations.Violation AS violation,
      ViolationsDesc.IsMajor AS violationIsMajor
    FROM 
      Violations 
    JOIN
      ViolationsDesc
    ON
      Violations.Violation = ViolationsDesc.Violation
    JOIN
      Students
    ON 
      Students.StudentId = Violations.StudentId
    WHERE
      Violations.Timestamp > date('${weekAgo}')
    GROUP BY 
      Students.Course,
      Students.Year,
      ViolationsDesc.isMajor
    ORDER BY 
      violationCount 
    DESC;
  `

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.week = rows
    next()
  })
}

const getCourseAndYearStatsMonth = (req, res, next) => {
  const monthAgo = format(Date.now() - 30 * 24 * 60 * 60 * 1000, `yyyy-MM-dd`);

  sql = `
    SELECT 
      Students.Course as studentCourse,
      Students.Year as studentYear,
      COUNT(Violations.Violation) AS violationCount, 
      Violations.Violation AS violation,
      ViolationsDesc.IsMajor AS violationIsMajor
    FROM 
      Violations 
    JOIN
      ViolationsDesc
    ON
      Violations.Violation = ViolationsDesc.Violation
    JOIN
      Students
    ON 
      Students.StudentId = Violations.StudentId
    WHERE
      Violations.Timestamp > date('${monthAgo}')
    GROUP BY 
      Students.Course,
      Students.Year,
      ViolationsDesc.isMajor
    ORDER BY 
      violationCount 
    DESC;
  `

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.month = rows
    next()
  })
}

const getCourseAndYearStatsYear = (req, res, next) => {
  const yearAgo = format(Date.now() - 365 * 24 * 60 * 60 * 1000, `yyyy-MM-dd`);

  sql = `
    SELECT 
      Students.Course as studentCourse,
      Students.Year as studentYear,
      COUNT(Violations.Violation) AS violationCount, 
      Violations.Violation AS violation,
      ViolationsDesc.IsMajor AS violationIsMajor
    FROM 
      Violations 
    JOIN
      ViolationsDesc
    ON
      Violations.Violation = ViolationsDesc.Violation
    JOIN
      Students
    ON 
      Students.StudentId = Violations.StudentId
    WHERE
      Violations.Timestamp > date('${yearAgo}')
    GROUP BY 
      Students.Course,
      Students.Year,
      ViolationsDesc.isMajor
    ORDER BY 
      violationCount 
    DESC;
  `

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);
    res.status(200).send({ success: true, data: { week: res.locals.week, month: res.locals.month, year: rows } });
  })
}

module.exports = {
  getCourseAndYearStatsWeek,
  getCourseAndYearStatsMonth,
  getCourseAndYearStatsYear,
  getRecentViolations,
  getViolationStatsWeek,
  getViolationStatsMonth,
  getViolationStatsYear,
};
