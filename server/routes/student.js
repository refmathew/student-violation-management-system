const express = require('express');
const router = express.Router();
const checkEmpty = require('../middleware/checkEmpty');
const authenticate = require('../middleware/authenticate');
const {
  checkQueryValidity,
  findStudent,
  getGuardList,
  getStudentData,
  getViolationList,
  register,
  recordViolation
} = require('../controllers/student');

router.use(checkEmpty);

router.route('/register')
  .post(register);

router.route('/record-violation')
  .post(authenticate, recordViolation);

router.route('/find')
  .get(checkQueryValidity, findStudent, getStudentData);

router.route('/get-violation-list')
  .get(getViolationList);

router.route('/get-guard-list')
  .get(getGuardList);

module.exports = router;
