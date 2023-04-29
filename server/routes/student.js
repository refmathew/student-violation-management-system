const express = require('express');
const router = express.Router();
const checkEmpty = require('../middleware/checkEmpty');
const authenticate = require('../middleware/authenticate');
const { register, recordViolation, findStudent, getStudentData } = require('../controllers/student');

router.use(checkEmpty);

router.route('/register')
  .post(register);

router.route('/record-violation')
  .post(authenticate, recordViolation);

router.route('/find')
  .get(findStudent, getStudentData);

module.exports = router;
