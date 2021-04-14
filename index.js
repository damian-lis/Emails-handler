const express = require('express')
const sendMail = require('./config/sendGrid/index.js')
const cors = require('cors')

const app = express()
const port = process.env.PORT || '5000'

app.use(cors())
app.use(express.json())

app.use('/api/mail', sendMail)
app.get('/', (req, res) => res.send('Email handler app'))

app.listen(port, () => console.log(`Server running on ${port}`))
