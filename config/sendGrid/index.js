const sgMail = require('@sendgrid/mail')
const keys = require('../../env.js')

sgMail.setApiKey(keys.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY)

const sendGisapiaMail = (req, res) => {
  const charEmail = req.body

  sgMail
    .send(charEmail)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
      res.json({
        success: true,
      })
    })
    .catch((error) => {
      console.error(error)
      res.json({
        success: false,
      })
    })
}

module.exports = sendGisapiaMail
