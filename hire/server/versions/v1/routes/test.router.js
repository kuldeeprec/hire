const express = require("express");
const router = express.Router();
const { checkProgradToken } = require("../../../utils/jwt");
const testController = require("../controller/test.controller");

router.get("/", checkProgradToken, testController.getTests);
router.get("/take-test", checkProgradToken, testController.getTakeTest);
router.post("/assign", testController.assignTest);

module.exports = router;