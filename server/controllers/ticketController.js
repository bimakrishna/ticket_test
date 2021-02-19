const { Ticket } = require('../models')

class TicketController {
    static async findAll(req, res, next) {
        try{
            const tickets = await Ticket.findAll()
            res.status(200).json(tickets)
        }   
        catch(err){
            next(err)
        }
    }

    static async editTicketStatus(req, res, next) {
        try {
            const id = req.params.id
            const { status } = req.body
            const ticket = await Ticket.findByPk(id)

            if(!ticket) {
                throw {
                    mesage: 'Ticket not found'
                }
            }
            const patch = await Ticket.update({
                status
            }, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(patch[1][0])
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = TicketController