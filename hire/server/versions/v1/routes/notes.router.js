const express = require("express");
const router = express.Router();
const notesController = require("../controller/notes.controller");
const { checkToken } = require("../../../utils/jwt");

router.get("/", checkToken, notesController.getNote);
router.post("/save", checkToken, notesController.saveNote);

module.exports = router;