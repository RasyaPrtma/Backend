const joi = require('joi'); // Memanggil library Joi untuk validasi

/**
 * Membuat array konfigurasi rute untuk autentikasi berdasarkan handler yang diberikan.
 * @param {Object} handler - Objek handler yang berisi fungsi-fungsi untuk autentikasi.
 * @returns {Array} - Array berisi konfigurasi rute untuk autentikasi.
 */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/register',
        handler: handler.registerHandler,
        options: {
            validate: {
                payload: joi.object({
                    name: joi.string().min(5).required(), // Validasi nama minimal 5 karakter
                    username: joi.string().min(5).required(), // Validasi username minimal 5 karakter
                    email: joi.string().required(), // Validasi email wajib ada
                    password: joi.string().min(5).required() // Validasi password minimal 5 karakter
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: handler.loginHandler,
        options: {
            validate: {
                payload: joi.object({
                    email: joi.string().required(), // Validasi email wajib ada
                    password: joi.string().min(5).required() // Validasi password minimal 5 karakter
                })
            }
        }
    }
];

module.exports = routes; // Ekspor fungsi routes yang telah dibuat untuk digunakan di file lain
