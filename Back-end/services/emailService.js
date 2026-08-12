const { Resend } = require("resend");

let resend;

function getResendClient() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

async function sendEmail(email, subject, html) {
  return getResendClient().emails.send({
    from: process.env.EMAIL_FROM,
    to: [email],
    subject,
    html,
  });
}

module.exports = { sendEmail };
