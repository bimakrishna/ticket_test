const { Ticket } = require('../models/index')

async function authorization (req, res, next) {
    const { id } = req.params
    try {
        const tickets = await Ticket.findByPk(id)
        if(!tickets) {
            throw {
                message: 'Ticket not Found', status: 404
            }
        }else if(tickets.UserId === req.loggedIn.id) {
            next()
        }
        else {
            throw {
                message: 'Not Authorized', status: 401
            }
        }
    }catch(error) {
        next(error)
    }
}

module.exports = authorization