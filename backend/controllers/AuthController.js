const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  async signUp(req, res) {
    try {
      const { email, password } = req.body

      // Input Validation
      if (!email || !password) {
        res.status(422).send({ message: 'Missing parameters.' })
        return
      }

      // Check first if user already exists in the DB
      let user = await prisma.user.findFirst({ where: { email } })
      if (user) {
        res.status(409).send({ message: `Email ${email} already exists.` })
        return
      }

      user = await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 10),
        },
      })

      res
        .status(200)
        .send({ success: true, message: 'Successful User Sign Up', data: user })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body

      // Input Validation
      if (!email || !password) {
        res.status(422).send({ message: 'Missing parameters.' })
        return
      }

      // Check first if user actually exists
      let user = await prisma.user.findFirst({ where: { email } })
      if (!user) {
        res.status(409).send({ message: `Email ${email} does not exist.` })
        return
      }

      if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).send({ message: 'Incorrect Password' })
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET, // Could be a pem file too
      )

      user['token'] = token

      res.status(200).send({
        success: true,
        message: 'Successful Login',
        data: { user },
      })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
}
