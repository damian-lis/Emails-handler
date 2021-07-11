const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendPortfolioMail = (req, res) => {
  const { email, subject, name, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'damian.lis1293@gmail.com',
    subject: `Portfolio - ${subject}`,
    html: `<p><strong>From: </strong>${name}</p><p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (err) =>
    err ? res.status(500).json({ success: false }) : res.json({ success: true })
  );
};

module.exports = sendPortfolioMail;
