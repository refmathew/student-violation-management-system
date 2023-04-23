const express = require('express');
const router = express.Router();
const { getRecentViolations } = require('../controllers/admin.js');

router.route('/violations/recent')
  .get(getRecentViolations);

module.exports = router;
