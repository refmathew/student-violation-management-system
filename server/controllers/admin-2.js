const db = require("../db/connect.js");

let sql;

const getViolationStatsLastYearQuery = (range) => {
  let timeAgo;
  let till;
  switch (range) {
    case "month":
      timeAgo = `"start of month", "-1 years"`;
      till = ` "start of month", "+30 days", "-1 years"`;
      break;
    case "year":
      timeAgo = `"start of year", "-1 years"`;
      till = `"start of year"`;
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
    WHERE
      Violations.Timestamp > date("now", ${timeAgo}) AND 
      Violations.Timestamp < date("now", ${till})
    GROUP BY 
      Violations.Violation
    ORDER BY 
      count 
    DESC;
  `;
};

const getViolationStatsAllTimeQuery = (range) => {
  let condition;
  switch (range) {
    case "month":
      condition = `strftime("%m", Violations.Timestamp) == strftime("%m")`;
      break;
    case "year":
      condition = `Violations.Timestamp < date("now", "start of year")`;
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
    WHERE
      ${condition}
    GROUP BY 
      Violations.Violation
    ORDER BY 
      count 
    DESC;
  `;
};

// =============================================================================== >

const getViolationStatsMonthLastYear = (req, res, next) => {
  db.all(getViolationStatsLastYearQuery("month"), [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.lastYearMonth = rows;
    next();
  });
};
const getViolationStatsYearLastYear = (req, res, next) => {
  db.all(getViolationStatsLastYearQuery("year"), [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.lastYearYear = rows;
    next();
  });
};
const getViolationStatsMonthAllTime = (req, res, next) => {
  db.all(getViolationStatsAllTimeQuery("month"), [], (err, rows) => {
    if (err) return console.error(err);
    res.locals.allTimeMonth = rows;
    next();
  });
};
const getViolationStatsYearAllTime = (req, res, next) => {
  db.all(getViolationStatsAllTimeQuery("year"), [], (err, rows) => {
    if (err) return console.error(err);
    res.status(200).send({
      success: true,
      data: {
        week: res.locals.week,
        month: res.locals.month,
        year: res.locals.year,
        lastYear: {
          month: res.locals.lastYearMonth,
          year: res.locals.lastYearYear,
        },
        allTime: {
          month: res.locals.allTimeMonth,
          year: rows,
        },
      },
    });
  });
};

module.exports = {
  getViolationStatsMonthLastYear,
  getViolationStatsYearLastYear,
  getViolationStatsMonthAllTime,
  getViolationStatsYearAllTime,
};
