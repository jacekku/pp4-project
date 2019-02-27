const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router.js')

const app = express()
const port = process.env.PORT||5000

app.use(cors({methods:"GET,POST",origin:"jacekku.github.com"}))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))
app.get('/user/:nickname', router.getNickname)
app.post('/register', router.register)
app.post('/login', router.checkLogin)
app.post('/token', router.getToken)

app.get('/messages/:id', router.getMessages)
app.post('/postmessage', router.postMessage)

app.listen(port, () => console.log(`Server listening at port: ${port}!`))