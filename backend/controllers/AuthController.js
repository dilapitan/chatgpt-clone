const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt')

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
}
