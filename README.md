# Emails-handler

The backend app that is used to handle e-mails in my projects below:

- Portfolio ([site](https://damianlis.pl/), [github](https://github.com/damian-lis/Portfolio-Website))
- Talk to Gisapia and the others ([site](https://talktogisapiaandtheothers.pl/), [github](https://github.com/damian-lis/Talk-to-Gisapia-and-the-Others))

<br/>

## Table of Contents

1. General info
2. Technologies
3. Setup
4. Features

   <br/>

## 1. General info

The main purpose of the application is to handle messages sent via the form on the portfolio website and via the messenger in the Talk to Gisapia and the others app.

<br/>

## 2. Technologies

The following technologies were used in the project:

- Node/Express
- Nodemailer
- Mailgun
- SendGrid

  <br/>

## 3. Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm run start
```

<br/>

## 4. Features

The app uses services such as nodemailer, mailgun and sendgrid.

The list of the most interesting features used in the app is presented below:

&nbsp; &nbsp; &nbsp; &nbsp; 4.1. Routes <br/>
&nbsp; &nbsp; &nbsp; &nbsp; 4.2. Handle mailgun/nodemailer services <br/>
&nbsp; &nbsp; &nbsp; &nbsp; 4.3. Handle sendgrid service <br/>

<br/>

### 4.1. Routes

The app supports two query paths:

- the route that handle query from the porfolio website (index.js):

```
app.use('/api/mail/portfolio', sendPortfolioMail)
```

<br/>

- the route that handle query from the Talk to Gisapia and the Others app (index.js):

```
app.use('/api/mail/gisapia', sendGisapiaMail)
```

<br/>

### 4.1. Handle mailgun/nodemailer services

Below is the code responsible for sending email to my mailbox from the portfolio website via mailgun/nodemailer sercices.

<br/>

The example of this solution is below (nodemailer/index.js):

```
const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
const keys = require('/env.js')

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
      res.status(500).json({success: false})
    } else {
      res.json({ success: true })
    }
  })
}

module.exports = sendPortfolioMail
```

The following processes take place in the example above:

- assigning the nodemailer (package) object to the nodemailer variable,
- assigning the nodemailer-mailgun-transport (package) function to the mailGun variable,
- assigning the appropriate mailGun keys to the keys variable,
- returning the so-called transporter object using the createTransport method of the nodemailer object (along with calling the mailGun function with passing the object argument containing the auth keys)
- calling the sendPortfolioMail function as a result of sending a query to the appropriate server route ('/api/mail/portfolio'), which destructs the passed data and uses them to dynamically complete the object assigned to the mailOptions variable. At the very end, in the discussed function, the sendMail method of the transporter object is called, which is responsible for sending the e-mail (when the e-mail is sent, json is returned with information about success, otherwise the status 500 with information about failure).

<br/>

### 4.2. Handle sendgrid service

Below is the code responsible for sending email to user mailbox from the Talk to Gisapia and the others app via sendgrid sercice.

<br/>

The example of this solution is below (sendgrid/index.js):

```
const sgMail = require('@sendgrid/mail')
const keys = require('../../env.js')

sgMail.setApiKey(keys.SENDGRID_API_KEY)

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
       res.status(500).json({success: false})
    })
}

module.exports = sendGisapiaMail

```

The following processes take place in the example above:

- assigning the sendgrid/mail (package) object to the sgMail variable,
- assigning the appropriate sendgrid key to the keys variable,
- calling the sendGisapiaMail function as a result of sending a query to the appropriate server route ('/api/mail/gisapia'), in which we assign the passed req.body object to the charEmail variable and call send method of sgMail object which is responsible for sending the e-mail to user email (when the e-mail is sent, json is returned with information about success, otherwise the status 500 with information about failure).
