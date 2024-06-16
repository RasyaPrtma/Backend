const joi = require('joi');
const bcrypt = require('bcrypt');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/article',
        handler: handler.uploadArticle,
        options: {
            auth: 'api_jwt',
            payload: {
                maxBytes: 10 * 1024 * 1024, // 10mb
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            },
            validate: {
                payload: joi.object({
                    title: joi.string().min(10).required(),
                    article: joi.string().min(20).required(),
                    file: joi.any().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/article/{id}',
        handler: handler.getArticleById,
        options: {
            auth: 'api_jwt'
        }
    },
    {
        method: "GET",
        path: '/article/{id}/image',
        handler: handler.downloadImage,
        options: {
            auth: 'api_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/article/{idArticle}',
        handler: handler.updateArticleById,
        options: {
            auth: 'api_jwt',
            payload: {
                maxBytes: 10 * 1024 * 1024, // 10mb
                output: 'stream', // Output type
                parse: true, // Parse multipart/form-data
                multipart: true,
                allow: 'multipart/form-data'
            },
            validate: {
                payload: joi.object({
                    title: joi.string().min(10).required(),
                    article: joi.string().min(20).required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/article/{id}',
        handler: handler.deleteArticleById,
        options: {
            auth: 'api_jwt'
        }
    },
    {
        method: 'GET',
        path: '/article',
        handler: handler.getAllArticles,
        options: {
            auth: 'api_jwt'
        }
    }
]

module.exports = routes;