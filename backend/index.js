const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes')(app)

const PORT = process.env.port || 4000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
