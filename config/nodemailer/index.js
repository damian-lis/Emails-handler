const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
const keys = require('../../env.js')

const auth = {
  auth: {
    api_key: keys.MAILGUN_API_KEY,
    domain: keys.MAILGUN_DOMAIN,
  },
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendPortfolioMail = (req, res) => {
  const { email, subject, name, message } = req.body

  const mailOptions = {
    from: email,
    to: 'damian.lis1293@gmail.com',
    subject: `Portfolio - ${subject}`,
    html: `<p><strong>From: </strong>${name}</p><p>${message}</p>`,
  }

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong, try again! 😬',
      })
    } else {
      res.json({ success: true, message: 'Message sent! 😎' })
    }
  })
}

module.exports = sendPortfolioMail
