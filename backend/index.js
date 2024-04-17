const express = require('express')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // Add Authorization?
  next()
})

require('./routes')(app)

const PORT = process.env.port || 4000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
