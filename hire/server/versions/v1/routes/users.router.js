const express = require("express");
const router = express.Router();
const usersController = require("../controller/users.controller");
const { checkToken } = require("../../../utils/jwt");

router.get("/", checkToken, usersController.getUsers);
router.post("/invite", checkToken, usersController.inviteUsers);
router.put("/update/status", checkToken, usersController.updateStatus);
router.post("/resend/invitation", checkToken, usersController.resendInvitation);

module.exports = router;