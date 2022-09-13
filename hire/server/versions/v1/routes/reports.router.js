const express = require("express");
const router = express.Router();
const reportsController = require("../controller/reports.controller");
const { checkToken } = require("../../../utils/jwt");

router.get("/", checkToken, reportsController.getReports);
router.get("/profile", checkToken, reportsController.getProfile);
router.get("/detailed-report", checkToken, reportsController.getDetailedReport);
router.get("/options", checkToken, reportsController.getOptions);

module.exports = router;