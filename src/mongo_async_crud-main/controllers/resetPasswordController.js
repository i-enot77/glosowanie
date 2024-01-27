const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());

const User = require("../model/User");

const resetPwdToken = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ username: decoded.username }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's password
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    user.password = hashedPwd;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset failed", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { resetPwdToken };
