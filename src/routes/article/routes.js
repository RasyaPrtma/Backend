const joi = require('joi');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/upload',
        handler: handler.uploadArticle,
        options: {
            payload:{
                maxBytes: 10 * 1024 * 1024, // 10mb
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            },
            validate:{
                payload: joi.object({
                    title: joi.string().min(10).required(),
                    article: joi.string().min(20).required(),
                    file: joi.any().required()
                })
            }
        }
    }
]

module.exports = routes;