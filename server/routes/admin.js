const express = require('express');
const router = express.Router();
const {
  getCourseAndYearStatsWeek,
  getCourseAndYearStatsMonth,
  getCourseAndYearStatsYear,
  getRecentViolations,
  getViolationStatsWeek,
  getViolationStatsMonth,
  getViolationStatsYear
} = require('../controllers/admin.js');

router.route('/violations/recent')
  .get(getRecentViolations);

router.route('/violations/stats/violations')
  .get(getViolationStatsWeek, getViolationStatsMonth, getViolationStatsYear);

router.route('/violations/stats/course-and-year')
  .get(getCourseAndYearStatsWeek, getCourseAndYearStatsMonth, getCourseAndYearStatsYear);

module.exports = router;
