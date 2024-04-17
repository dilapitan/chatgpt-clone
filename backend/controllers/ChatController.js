const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
  async getChats(req, res) {
    try {
      const chats = await prisma.chat.findMany()
      res.status(200).json(chats)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async getChatsByUser(req, res) {
    try {
      const chat = await prisma.chat.findMany({
        where: {
          user_id: Number(req.params.id),
        },
      })
      if (!chat)
        res.status(404).send({ message: `Chat ${req.params.id} not found.` })
      else res.status(200).send(chat)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async createChat(req, res) {
    try {
      const chat = await prisma.chat.create({
        data: {
          chatPrompt: req.body.chatPrompt,
          chatAllPrompt: req.body.chatAllPrompt,
          user_id: req.body.user_id,
        },
      })
      res.status(201).json(chat)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async getChat(req, res) {
    try {
      const chat = await prisma.chat.findUnique({
        where: {
          chatID: Number(req.params.id),
        },
      })
      if (!chat)
        res.status(404).send({ message: `Chat ${req.params.id} not found.` })
      else res.status(200).send(chat)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async editChat(req, res) {
    try {
      const chat = await prisma.chat.update({
        where: {
          chatID: Number(req.params.id),
        },
        data: {
          chatAllPrompt: req.body.chatAllPrompt,
        },
      })
      res.status(200).json(chat)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async deleteChat(req, res) {
    try {
      const chat = await prisma.chat.delete({
        where: {
          chatID: Number(req.params.id),
        },
      })
      res.status(200).json(chat)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
}
