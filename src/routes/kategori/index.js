const KategoriHandler = require("./handler"); // Memanggil handler untuk kategori
const routes = require("./routes"); // Memanggil konfigurasi rute kategori

/**
 * Plugin untuk mengelola kategori di server.
 * @type {Object}
 */
const kategoriPlugin = {
    name: "kategori", // Nama plugin kategori
    version: '1.0.0', // Versi plugin kategori

    /**
     * Fungsi untuk mendaftarkan plugin kategori ke server Hapi.
     * @param {Object} server - Objek server Hapi yang digunakan.
     * @param {Object} options - Opsi yang dibutuhkan untuk plugin ini.
     * @param {Object} options.service - Layanan untuk mengelola kategori.
     */
    register: async (server, { service }) => {
        const handler = new KategoriHandler(service); // Inisialisasi handler kategori
        const route = routes(handler); // Konfigurasi rute kategori menggunakan handler yang telah dibuat
        server.route(route); // Daftarkan rute kategori ke server Hapi
    }
};

module.exports = kategoriPlugin; // Ekspor plugin kategori untuk digunakan di aplikasi lain
