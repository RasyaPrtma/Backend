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
                    file: joi.any().required(),
                    kategori: joi.string().required()
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
        handler: handler.downloadImage
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
        handler: handler.getAllArticles
    },
    {
        method: 'GET',
        path: '/article/user',
        handler: handler.getArticleUser,
        options: {
            auth: 'api_jwt'
        }
    },
    {
        method: 'GET',
        path: '/article/kategori/{id}',
        handler: handler.getArticleByKategori,
        options: {
            auth: 'api_jwt'
        }
    },
    {
        method: 'GET',
        path: '/article/search/{name}',
        handler: handler.searchArticleByName
    },
    {
        method: 'GET',
        path: '/article/sort/{name}/type/{type}',
        handler: handler.sortArticle
    }

]

module.exports = routes;