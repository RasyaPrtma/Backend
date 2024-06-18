const joi = require('joi'); // Memanggil library Joi untuk validasi
const bcrypt = require('bcrypt'); // Memanggil library bcrypt untuk hashing

/**
 * Membuat array konfigurasi rute untuk artikel berdasarkan handler yang diberikan.
 * @param {Object} handler - Objek handler yang berisi fungsi-fungsi untuk mengelola artikel.
 * @returns {Array} - Array berisi konfigurasi rute untuk artikel.
 */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/article',
        handler: handler.uploadArticle,
        options: {
            auth: 'api_jwt', // Mengharuskan autentikasi JWT untuk mengakses rute ini
            payload: {
                maxBytes: 10 * 1024 * 1024, // Batas maksimum ukuran payload (10MB)
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            },
            validate: {
                payload: joi.object({
                    title: joi.string().min(10).required(), // Validasi title minimal 10 karakter
                    article: joi.string().min(20).required(), // Validasi artikel minimal 20 karakter
                    file: joi.any().required(), // Validasi file wajib ada
                    kategori: joi.string().required() // Validasi kategori wajib ada
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/article/{id}',
        handler: handler.articleById,
    },
    {
        method: "GET",
        path: '/article/{id}/image',
        handler: handler.downloadImage
    },
    {
        method: 'PUT',
        path: '/article/{idArticle}',
        handler: handler.updateArticle,
        options: {
            auth: 'api_jwt', // Mengharuskan autentikasi JWT untuk mengakses rute ini
            payload: {
                maxBytes: 10 * 1024 * 1024,
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            },
            validate: {
                payload: joi.object({
                    title: joi.string().min(10).required(), // Validasi title minimal 10 karakter
                    article: joi.string().min(20).required(), // Validasi artikel minimal 20 karakter
                    image: joi.any(), // Validasi image (opsional)
                    kategori: joi.string() // Validasi kategori (opsional)
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/article/{id}',
        handler: handler.deleteArticleById,
        options: {
            auth: 'api_jwt' // Mengharuskan autentikasi JWT untuk mengakses rute ini
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
            auth: 'api_jwt' // Mengharuskan autentikasi JWT untuk mengakses rute ini
        }
    },
    {
        method: 'GET',
        path: '/article/kategori/{id}',
        handler: handler.getArticleByKategori,
        options: {
            auth: 'api_jwt' // Mengharuskan autentikasi JWT untuk mengakses rute ini
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
    },
    {
        method: 'GET',
        path: '/article/filter/{kategori}',
        handler: handler.filterArticleByKategori
    }
];

module.exports = routes; // Ekspor fungsi routes yang telah dibuat untuk digunakan di file lain
