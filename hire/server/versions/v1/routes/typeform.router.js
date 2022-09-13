const express = require("express");
const multer = require("multer");
const router = express.Router();
const typeformController = require("../controller/typeform.controller");
const { checkToken } = require("../../../utils/jwt");

const upload = multer({ dest: "uploads/" });

router.post("/logs", checkToken,  upload.single("file"), typeformController.saveLogs);

module.exports = router;