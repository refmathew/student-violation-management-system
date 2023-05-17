const router = require("express").Router();
const { authenticateUser } = require("../controllers/user");

router.route("/authenticate").post(authenticateUser);

module.exports = router;
