const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //1-Create Transporter(Service that will send email: "gmail" "MailGun", "mailtrap", sendGrid)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, //igf secure false then port=578, else 465
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });
  //2- Define options: from who, to who, subject, content
  const mailOptions = {
    from: "E-Shop App<ismaielnagaty@live.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3-Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
