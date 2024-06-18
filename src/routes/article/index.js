const ArticleHandler = require('./handler'); // Memanggil handler untuk artikel
const routes = require('./routes'); // Memanggil konfigurasi rute artikel

/**
 * Plugin untuk mengelola artikel di server.
 * @type {Object}
 */
const articlePlugin = {
    name: 'article', // Nama plugin artikel
    version: '1.0.0', // Versi plugin artikel

    /**
     * Fungsi untuk mendaftarkan plugin artikel ke server Hapi.
     * @param {Object} server - Objek server Hapi yang digunakan.
     * @param {Object} options - Opsi yang dibutuhkan untuk plugin ini.
     * @param {Object} options.service - Layanan untuk mengelola artikel.
     * @param {Object} options.serviceKategori - Layanan untuk mengelola kategori artikel.
     */
    register: async (server, { service, serviceKategori }) => {
        const handler = new ArticleHandler(service, serviceKategori); // Inisialisasi handler artikel
        const ArticleRoute = routes(handler); // Konfigurasi rute artikel menggunakan handler yang telah dibuat
        server.route(ArticleRoute); // Daftarkan rute artikel ke server Hapi
    }
};

module.exports = articlePlugin; // Export plugin artikel untuk digunakan di aplikasi lain
