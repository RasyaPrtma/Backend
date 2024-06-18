const Jwt = require('@hapi/jwt'); // Memanggil library @hapi/jwt untuk mengelola token JWT

/**
 * Objek untuk mengelola pembuatan token JWT.
 * @type {Object}
 */
const TokenManager = {
    /**
     * Fungsi untuk menghasilkan token JWT berdasarkan payload yang diberikan.
     * @param {Object} payload - Data yang akan dienkripsi dalam token JWT.
     * @returns {string} - Token JWT yang dihasilkan.
     */
    generateToken: payload => Jwt.token.generate(payload, process.env.JWT_SECRET)
};

module.exports = TokenManager; // Ekspor objek TokenManager untuk digunakan di file lain
