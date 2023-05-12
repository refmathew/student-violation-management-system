const { format } = require('date-fns');
const _ = require('lodash');
const db = require('../db/connect.js');
let sql;

const getTimeStatsQuery = (range) => {
  let timeAgo;
  switch (range) {
    case 'week':
      timeAgo = '-007 days';
      break;
    case 'month':
      timeAgo = '-030 days';
      break;
    case 'year':
      timeAgo = '-001 years';
      break;
  }

  return `
    SELECT
      strftime('%H', Violations.Timestamp) AS violationTime,
      COUNT(Violations.Violation) AS violationCount
    FROM
      Violations
    WHERE
      Violations.Timestamp > date("now", "${timeAgo}")
    GROUP BY
      violationTime
    ORDER BY
      violationTime
    ASC;
  `
}

const getGuardStatsQuery = (range) => {
  let timeAgo;
  switch (range) {
    case 'week':
      timeAgo = '-007 days';
      break;
    case 'month':
      timeAgo = '-030 days';
      break;
    case 'year':
      timeAgo = '-001 years';
      break;
  }

  return `
    SELECT
      COUNT(Violations.Violation) AS violationCount,
      Guard AS violationGuard
    FROM 
      Violations
    WHERE 
      Violations.Timestamp > date("now", "${timeAgo}")
	 GROUP BY 
      violationGuard
    ORDER BY
      violationGuard
    ASC;
`
}

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
      studentCourse
    ASC;
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
      studentCourse
    ASC;
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
      studentCourse
    ASC;
  `

  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err);
    res.status(200).send({ success: true, data: { week: res.locals.week, month: res.locals.month, year: rows } });
  })
}

const getTimeStatsWeek = (req, res, next) => {
  db.all(getTimeStatsQuery('week'), [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.week = rows
    next()
  })
}

const getTimeStatsMonth = (req, res, next) => {
  db.all(getTimeStatsQuery('month'), [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.month = rows
    next()
  })
}

const getTimeStatsYear = (req, res, next) => {
  db.all(getTimeStatsQuery('year'), [], (err, rows) => {
    if (err) return console.error(err);
    res.status(200).send({ success: true, data: { week: res.locals.week, month: res.locals.month, year: rows } });
  })
}

const getGuardStatsWeek = (req, res, next) => {
  db.all(getGuardStatsQuery('week'), [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, message: err })
    res.locals.week = rows
    next()
  })
}

const getGuardStatsMonth = (req, res, next) => {
  db.all(getGuardStatsQuery('month'), [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, message: err })
    res.locals.month = rows
    next()
  })
}

const getGuardStatsYear = (req, res, next) => {
  db.all(getGuardStatsQuery('year'), [], (err, rows) => {
    if (err) return res.status(500).send({ success: false, message: err })
    res.status(200).send({
      success: true,
      data: {
        week: res.locals.week,
        month: res.locals.month,
        year: rows
      }
    })
  })
}

const registerViolation = (req, res, next) => {
  const values = Object.values(req.body);
  sql = `
    INSERT INTO 
      ViolationsDesc(Violation, Number, IsMajor) 
    VALUES
      (?, ?, ?);
  `

  db.run(sql, values, (err, result) => {
    if (err) {
      if (err.errno === 19) res.status(400).send({ success: false, message: "Violation already exists" })
    } else {
      res.status(200).send({ success: true, message: "Violation successfully registered" })
    }
  })
}
const registerGuard = (req, res, next) => {
  const values = Object.values(req.body);
  sql = `
    INSERT INTO 
      Guard(firstname, lastname) 
    VALUES
      (?, ?);
  `

  db.run(sql, values, (err, result) => {
    console.log(err, result)
    if (err) {
      if (err.errno === 19) res.status(400).send({ success: false, message: "Guard already exists" })
    } else {
      res.status(200).send({ success: true, message: "Guard successfully registered" })
    }
  })
}

module.exports = {
  getCourseAndYearStatsWeek,
  getCourseAndYearStatsMonth,
  getCourseAndYearStatsYear,
  getGuardStatsWeek,
  getGuardStatsMonth,
  getGuardStatsYear,
  getRecentViolations,
  getTimeStatsWeek,
  getTimeStatsMonth,
  getTimeStatsYear,
  getViolationStatsWeek,
  getViolationStatsMonth,
  getViolationStatsYear,
  registerGuard,
  registerViolation
};
