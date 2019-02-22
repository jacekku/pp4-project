const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT||5000
const postgres = require('./test.js')
app.use(cors({methods:"GET,POST"}))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))
app.get('/postgres', postgres.getMessages)
app.post('/postmessage', postgres.postMessage)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))