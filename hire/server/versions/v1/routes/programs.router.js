const express = require("express");
const router = express.Router();
const programsController = require("../controller/programs.controller");
const { checkProgradToken } = require("../../../utils/jwt");

router.get("/", checkProgradToken, programsController.getPrograms);

module.exports = router;