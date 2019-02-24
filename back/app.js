const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router.js/index.js')

const app = express()
const port = process.env.PORT||5000

app.use(cors({methods:"GET,POST"}))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))
app.get('/postgres', router.getMessages)
// app.post('/postmessage', router.postMessage)
app.post('/register', router.register)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))