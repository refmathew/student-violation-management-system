const express = require('express');
const router = express.Router();
const { registerStudent } = require('../controllers/student');

router.route('/register')
  .post(registerStudent);

module.exports = router;
