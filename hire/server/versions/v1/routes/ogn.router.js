const express = require("express");
const router = express.Router();
const ognController = require("../controller/ogn.controller");
const { checkToken } = require("../../../utils/jwt");

router.get("/", checkToken, ognController.getOrganizations);
router.get("/info", checkToken, ognController.getOrganization);
router.get("/check/domain", ognController.checkDomain);
router.get("/users", checkToken, ognController.getUsers);
router.post("/add", checkToken, ognController.addOrganization);
router.post("/update", checkToken, ognController.updateOrganization);
router.put("/update/status", checkToken, ognController.updateStatus);

module.exports = router;