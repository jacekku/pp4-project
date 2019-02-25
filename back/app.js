const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router.js')

const app = express()
const port = process.env.PORT||5000

app.use(cors({methods:"GET,POST"}))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))
app.get('/postgres', router.getMessages)
app.get('/user/:nickname', router.getNickname)
// app.post('/postmessage', router.postMessage)
app.post('/register', router.register)
app.post('/login', router.checkLogin)
app.post('/token', router.getToken)

app.listen(port, () => console.log(`Server listening at port: ${port}!`))