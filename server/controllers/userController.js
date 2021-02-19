const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const newUser = await User.create(payload)

            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        }
        catch(err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(!user) {
                throw {
                    status: 401,
                    error: 'wrong password/email'
                }
            }
            else if (!comparePassword(payload.password, user.password)) {
                throw {
                    status: 401,
                    error: 'wrong password/email'
                }
            }
            else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    access_token
                })
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = UserController