const express = require("express");
const router = express.Router();
const { userValidator, errorChecker } = require("../../validator/index");
const { register } = require("../../controllers/users");
router.get("/", (req, res) => res.send("User routes"));
router.post("/", userValidator, errorChecker, register);
module.exports = router;
