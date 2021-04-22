const sgMail = require('@sendgrid/mail')
const createGisapiaMessages = require('./createGisapiaMessages.js')
const keys = require('/env.js')

sgMail.setApiKey(keys.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY)

const sendGisapiaMail = (req, res) => {
  const mailMessage = createGisapiaMessages({ type: 'mail', data: req.body })

  sgMail
    .send(mailMessage)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
      res.json({
        success: true,
        message: createGisapiaMessages({ type: 'success' }),
      })
    })
    .catch((error) => {
      console.error(error)
      res.json({
        success: false,
        message: createGisapiaMessages({ type: 'error' }),
      })
    })
}

module.exports = sendGisapiaMail
