const express = require("express");
const router = express.Router();
const checkEmpty = require("../middleware/checkEmpty");
const authenticate = require("../middleware/authenticate");
const {
  checkQueryValidity,
  findStudent,
  getGuardList,
  getStudentDataThisYear,
  getStudentDataLastYear,
  getStudentDataAllTime,
  getViolationList,
  register,
  recordViolation,
  getStudentData,
} = require("../controllers/student");

router.use(checkEmpty);

router.route("/register").post(register);

router.route("/record-violation").post(authenticate, recordViolation);

router
  .route("/find")
  .get(
    checkQueryValidity,
    findStudent,
    getStudentData,
    getStudentDataThisYear,
    getStudentDataLastYear,
    getStudentDataAllTime
  );

router.route("/get-violation-list").get(getViolationList);

router.route("/get-guard-list").get(getGuardList);

router
  .route("/get-student-data")
  .get(getStudentDataThisYear, getStudentDataLastYear, getStudentDataAllTime);

module.exports = router;
