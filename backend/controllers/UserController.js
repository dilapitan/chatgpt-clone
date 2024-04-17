const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async getUser(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
      })
      if (!user)
        res.status(404).send({ message: `User ${req.params.id} not found.` })
      else res.status(200).send(user)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async createUser(req, res) {
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
  },

  async editUser(req, res) {
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
  },

  async deleteUser(req, res) {
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
  },
}
