const express = require('express')
const router = express.Router()

const TicketController = require('../controllers/ticketController')

router.get('/', TicketController.findAll)
router.patch('/:id', TicketController.editTicketStatus)

module.exports = router
