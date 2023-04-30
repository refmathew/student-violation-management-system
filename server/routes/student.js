const express = require('express');
const router = express.Router();
const checkEmpty = require('../middleware/checkEmpty');
const authenticate = require('../middleware/authenticate');
const { checkQueryValidity, findStudent, getStudentData, register, recordViolation } = require('../controllers/student');

router.use(checkEmpty);

router.route('/register')
  .post(register);

router.route('/record-violation')
  .post(authenticate, recordViolation);

router.route('/find')
  .get(checkQueryValidity, findStudent, getStudentData);

module.exports = router;
