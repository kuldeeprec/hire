const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const { checkToken } = require("../../../utils/jwt");
const IPMiddleware = require("../../../middlewares/ipTracker.middleware");

router.post("/signin", authController.signinUser);
router.post("/reset-password", IPMiddleware, authController.resetPassword);
router.post("/validate-otp", authController.validateOtp);
router.post("/create-password", authController.createPassword);
// router.post("/join", IPMiddleware, authController.joinOrganization);
router.post("/verify-otp", authController.verifyOtp);
router.post("/create-account", authController.createAccount);
router.get("/attributes", authController.getAttributes);

module.exports = router;