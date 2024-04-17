const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')

module.exports = (app) => {
  // Test
  app.get('/test', (req, res) => {
    try {
      res.status(200).send({ message: 'API is working' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  })

  // Auth
  app.post('/signup', AuthController.signUp)
  app.post('/login', AuthController.login)

  // User
  app.get('/users', UserController.getUsers)
  app.get('/users/:id', UserController.getUser)
  app.post('/users', UserController.createUser)
  app.put('/users/:id', UserController.editUser)
  app.delete('/users/:id', UserController.deleteUser)
}
