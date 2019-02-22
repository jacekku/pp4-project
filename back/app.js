const express = require('express')
const app = express()
const port = process.env.PORT||5000
const postgres = require('./test.js')

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/postgres', (req, res) => res.json(postgres.getComments()))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))