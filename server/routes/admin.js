const express = require('express');
const router = express.Router();
const {
  getCourseAndYearStatsWeek,
  getCourseAndYearStatsMonth,
  getCourseAndYearStatsYear,
  getRecentViolations,
  getTimeStatsWeek,
  getTimeStatsMonth,
  getTimeStatsYear,
  getViolationStatsWeek,
  getViolationStatsMonth,
  getViolationStatsYear
} = require('../controllers/admin.js');

router.route('/violations/recent')
  .get(getRecentViolations);

router.route('/violations/stats/course-and-year')
  .get(getCourseAndYearStatsWeek, getCourseAndYearStatsMonth, getCourseAndYearStatsYear);

router.route('/violations/stats/time')
  .get(getTimeStatsWeek, getTimeStatsMonth, getTimeStatsYear)

router.route('/violations/stats/violations')
  .get(getViolationStatsWeek, getViolationStatsMonth, getViolationStatsYear);


module.exports = router;
