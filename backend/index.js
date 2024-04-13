const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // Add Authorization?
  next()
})

app.get('/test', (req, res) => {
  try {
    res.status(200).send({ message: 'API is working' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Create new user
app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Update user
app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

const PORT = process.env.port || 4000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
