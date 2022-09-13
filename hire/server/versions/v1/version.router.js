const express = require("express");
const router = express.Router();

// routers
const authRouter = require("./routes/auth.router");
const notesRouter = require("./routes/notes.router");
const ognRouter = require("./routes/ogn.router");
const programsRouter = require("./routes/programs.router");
const reportsRouter = require("./routes/reports.router");
const rolesRouter = require("./routes/roles.router");
const settingsRouter = require("./routes/settings.router");
const testRouter = require("./routes/test.router");
const typeformRouter = require("./routes/typeform.router");
const usersRouter = require("./routes/users.router");

router.get("/", function (req, res) {
    res.status(200).send({ status: "success", message: "API is working fine. ping" });
});

//All Route Paths
router.use("/auth", authRouter);
router.use("/notes", notesRouter);
router.use("/ogn", ognRouter);
router.use("/programs", programsRouter);
router.use("/reports", reportsRouter);
router.use("/roles", rolesRouter);
router.use("/settings", settingsRouter);
router.use("/test", testRouter);
router.use("/typeform", typeformRouter);
router.use("/users", usersRouter);

module.exports = router;