const joi = require('joi');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/register',  
        handler: handler.registerHandler,
        options:{
            validate: {
                payload: joi.object({
                    name: joi.string().min(5).required(),
                    username: joi.string().min(5).required(),
                    email: joi.string().email().required(),
                    password: joi.string().min(5).required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: handler.loginHandler,
        options:{
            validate:{
                payload: joi.object({
                    email: joi.string().email().required(),
                    password: joi.string().min(5).required()
                })
            }
        }
    }
]

module.exports = routes;