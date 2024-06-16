const Joi = require("joi");

const routes = (handler) => [
    {
        method:'POST',
        path:'/kategori',
        handler:handler.uploadKategori,
        options:{
            validate:{
                payload: Joi.object({
                    name: Joi.string().min(5).required()
                })
            }
        }
    },
    {
        method: 'GET',
        path:'/kategori',
        handler: handler.getAll
    },
    {
        method: 'GET',
        path: '/kategori/{id}',
        handler: handler.getKategoriId
    },
    {
        method: 'PUT',
        path: '/kategori/{id}',
        handler: handler.editKategori
    },
    {
        method: 'DELETE',
        path: '/kategori/{id}',
        handler: handler.deleteKategori
    }
]

module.exports = routes;