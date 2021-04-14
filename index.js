const express = require('express')
const sendGisapiaMail = require('./config/sendGrid/index.js')
const sendPortfolioMail = require('./config/nodemailer/index.js')
const cors = require('cors')

const app = express()
const port = process.env.PORT || '5000'

app.use(cors())
app.use(express.json())

app.use('/api/mail/gisapia', sendGisapiaMail)
app.use('/api/mail/portfolio', sendPortfolioMail)
app.get('/', (req, res) => res.send('Emails handler app'))

app.listen(port, () => console.log(`Server running on ${port}`))
