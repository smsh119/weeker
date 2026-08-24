const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "verifyEmail.html"), "utf8");
const resetHtml = fs.readFileSync(
  path.join(__dirname, "resetPassword.html"),
  "utf8",
);

function getVerificationEmailHtml({ fullname, verificationUrl }) {
  return html
    .replaceAll("{{fullname}}", fullname)
    .replaceAll("{{verificationUrl}}", verificationUrl)
    .replaceAll("{{year}}", String(new Date().getFullYear()));
}

function getResetPasswordEmailHtml({ fullname, resetUrl }) {
  return resetHtml
    .replaceAll("{{fullname}}", fullname)
    .replaceAll("{{resetUrl}}", resetUrl)
    .replaceAll("{{year}}", String(new Date().getFullYear()));
}

module.exports = { getVerificationEmailHtml, getResetPasswordEmailHtml };
