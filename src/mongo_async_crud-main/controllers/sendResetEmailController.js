const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const User = require("../model/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetEmail = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const generateToken = (username) => {
      return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
    };

    const resetToken = generateToken(username);

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: username,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email", error);
        return res.status(500).json({ message: "Error sending email" });
      }

      console.log("Email sent: " + info.response);
      res.json({ message: "Password reset link sent to your email" });
    });
  } catch (error) {
    console.error("Password reset request failed", error);
    res.status(500).json({ message: "Password reset request failed" });
  }
};

module.exports = { sendResetEmail };
