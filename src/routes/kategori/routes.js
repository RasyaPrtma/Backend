const Joi = require("joi"); // Memanggil library Joi untuk validasi

/**
 * Membuat array konfigurasi rute untuk kategori berdasarkan handler yang diberikan.
 * @param {Object} handler - Objek handler yang berisi fungsi-fungsi untuk mengelola kategori.
 * @returns {Array} - Array berisi konfigurasi rute untuk kategori.
 */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/kategori',
        handler: handler.uploadKategori,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(2).required() // Validasi nama kategori minimal 5 karakter
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/kategori',
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
];

module.exports = routes; // Ekspor fungsi routes yang telah dibuat untuk digunakan di file lain
