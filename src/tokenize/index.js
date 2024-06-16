const Jwt = require('@hapi/jwt')

const TokenManager = {
    generateToken : payload => Jwt.token.generate(payload, process.env.S)
}


module.exports = TokenManager

