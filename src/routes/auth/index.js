const AuthHandler = require('./handler'); // Memanggil handler untuk autentikasi
const routes = require('./routes'); // Memanggil konfigurasi rute autentikasi

/**
 * Plugin untuk mengelola autentikasi pengguna di server.
 * @type {Object}
 */
const authPlugin = {
    name: 'auth', // Nama plugin autentikasi
    version: '1.0.0', // Versi plugin autentikasi

    /**
     * Fungsi untuk mendaftarkan plugin autentikasi ke server Hapi.
     * @param {Object} server - Objek server Hapi yang digunakan.
     * @param {Object} options - Opsi yang dibutuhkan untuk plugin ini.
     * @param {Object} options.service - Layanan untuk mengelola autentikasi pengguna.
     */
    register: async (server, { service }) => {
        const handler = new AuthHandler(service); // Inisialisasi handler autentikasi
        const AuthRoute = routes(handler); // Konfigurasi rute autentikasi menggunakan handler yang telah dibuat
        server.route(AuthRoute); // Daftarkan rute autentikasi ke server Hapi
    }
};

module.exports = authPlugin; // Export plugin autentikasi untuk digunakan di aplikasi lain
