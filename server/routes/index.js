const express = require('express')
const router = express.Router()
const ticketRoute = require('./ticketRoute')
const UserController = require('../controllers/userController')

router.use('/ticket', ticketRoute)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router
