const express = require("express");
const auth = require("../../middleware/auth");
const { getUser, signin } = require("../../controllers/auth");
const router = express.Router();

router.get("/", auth, getUser);
router.post("/", signin);

module.exports = router;
