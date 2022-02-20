const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
  const { SMTP_SERVER_HOST, SMTP_SERVER_PORT, SMTP_EMAIL, SMTP_PASS } =
    process.env;

  let transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: SMTP_SERVER_PORT,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
