
const express = require('express')
const app = express()

const startApp = require('./start_APP')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const args = process.argv;
const port = args[2] ? parseInt(args[2])  : 3000

app.listen(port, () => {
    console.log(`App running on : http://localhost:${port}`)
    startApp()
})