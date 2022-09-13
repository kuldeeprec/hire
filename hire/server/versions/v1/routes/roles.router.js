const express = require("express");
const multer = require("multer");
const router = express.Router();
const rolesController = require("../controller/roles.controller");
const { checkToken } = require("../../../utils/jwt");
const { checkProgradToken } = require("../../../utils/jwt");
const multerInstance = multer();

router.get("/", checkToken, rolesController.getRoles);
router.post(
  "/add",
  [checkToken, multerInstance.single("file")],
  rolesController.addRole
);
router.post("/add/batch", checkToken, rolesController.addBatch);
router.post("/update/batch", checkToken, rolesController.updateBatch);
router.get("/jd", checkToken, rolesController.getJobDescription);
router.post(
  "/update/jd",
  [checkToken, multerInstance.single("file")],
  rolesController.updateJobDescription
);
router.post("/add/companyspq", checkToken, rolesController.addcompanyspq);
router.get("/get/companyspq", checkProgradToken, rolesController.getcompanyspq);

module.exports = router;
