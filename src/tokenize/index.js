const Jwt = require('@hapi/jwt')

const TokenManager = {
    generateToken : payload => Jwt.token.generate(payload, process.env.JWT_SECRET)
}


module.exports = TokenManager

