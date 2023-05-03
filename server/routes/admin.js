const express = require('express');
const router = express.Router();
const {
  getRecentViolations,
  getViolationStatsWeek,
  getViolationStatsMonth,
  getViolationStatsYear
} = require('../controllers/admin.js');

router.route('/violations/recent')
  .get(getRecentViolations);

router.route('/violations/stats/violations')
  .get(getViolationStatsWeek, getViolationStatsMonth, getViolationStatsYear);

module.exports = router;
