const express = require("express");
const router = express.Router();
const sendResetEmail = require("../controllers/sendResetEmailController");

router.post("/", sendResetEmail.sendResetEmail);

module.exports = router;
