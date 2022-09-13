const express = require("express");
const router = express.Router();
const settingsController = require("../controller/settings.controller");
const { checkToken } = require("../../../utils/jwt");

router.put("/user-details", checkToken, settingsController.updateUserDetails);
router.put("/change-password", checkToken, settingsController.changePassword);


module.exports = router;