require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_EMAIL,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

function sendEmail(message) {
  message.from = "rodrigescouy25@gmail.com";
  return transport.sendMail(message);
}

module.exports = sendEmail;
