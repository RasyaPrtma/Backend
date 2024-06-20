/**
 * Kelas untuk menangani operasi terkait kategori.
 */
class KategoriHandler {
    /**
     * Konstruktor untuk KategoriHandler.
     * @param {Object} service - Objek service yang menyediakan fungsi-fungsi untuk mengelola kategori.
     */
    constructor(service) {
        this.KategoriController = service;
    }

    /**
     * Handler untuk menambahkan kategori baru.
     * @param {Object} req - Objek request dari server Hapi.
     * @param {Object} h - Objek response toolkit dari server Hapi.
     * @returns {Object} - Objek response HTTP yang berisi status berhasil atau gagal.
     */
    uploadKategori = async (req, h) => {
        const { name } = req.payload;
        try {
            // Memeriksa apakah kategori sudah ada
            const findKategori = await this.KategoriController.getKategoriByName(name);

            // Jika kategori sudah ada, kirim response 409
            if (findKategori.length > 0) {
                return h.response({ status: 'pending', message: 'Kategori Sudah Ada!' });
            }

            // Menambahkan kategori baru ke dalam database
            await this.KategoriController.addKategori(name);

            // Mengirim response berhasil
            return h.response({
                status: 'berhasil',
                message: 'Berhasil Membuat Kategori'
            }).code(201);

        } catch (error) {
            console.log('Error Server: ', error);
            return h.response(error).code(500);
        }
    }

    /**
     * Handler untuk mendapatkan semua kategori.
     * @param {Object} req - Objek request dari server Hapi.
     * @param {Object} h - Objek response toolkit dari server Hapi.
     * @returns {Object} - Objek response HTTP yang berisi status berhasil, pesan, dan data kategori.
     */
    getAll = async (req, h) => {
        try {
            // Mendapatkan semua kategori dari database
            const kategori = await this.KategoriController.getAllKategori();

            // Jika tidak ada kategori yang ditemukan, kirim response 204
            if (kategori.length === 0) {
                return h.response({
                    status: 'pending',
                    message: 'Kategori Kosong!'
                }).code(204);
            }

            // Mengirim response berhasil beserta data kategori
            return h.response({
                status: 'berhasil',
                message: 'Berhasil Mendapatkan Kategori',
                data: kategori
            }).code(200);

        } catch (error) {
            console.log('Error Server: ', error);
            return h.response(error).code(500);
        }
    }

    /**
     * Handler untuk mendapatkan kategori berdasarkan ID.
     * @param {Object} req - Objek request dari server Hapi.
     * @param {Object} h - Objek response toolkit dari server Hapi.
     * @returns {Object} - Objek response HTTP yang berisi status berhasil, pesan, dan data kategori.
     */
    getKategoriId = async (req, h) => {
        const { id } = req.params;
        try {
            // Mendapatkan kategori berdasarkan ID dari database
            const data = await this.KategoriController.getKategoriById(id);

            // Jika kategori tidak ditemukan, kirim response 404
            if (data.length === 0) {
                return h.response({ status: 'gagal', message: 'Kategori Tidak Ditemukan' }).code(404);
            }

            // Mengirim response berhasil beserta data kategori
            return h.response({
                status: 'berhasil',
                message: 'Berhasil Mendapatkan Kategori',
                data: data
            }).code(200);

        } catch (error) {
            console.log('Server Error', error);
            return h.response(error).code(500);
        }
    }

    /**
     * Handler untuk mengedit kategori berdasarkan ID.
     * @param {Object} req - Objek request dari server Hapi.
     * @param {Object} h - Objek response toolkit dari server Hapi.
     * @returns {Object} - Objek response HTTP yang berisi status berhasil atau gagal, dan jumlah data yang terpengaruh.
     */
    editKategori = async (req, h) => {
        const { name } = req.payload;
        const { id } = req.params;
        try {
            // Memeriksa apakah kategori dengan ID yang diberikan ada
            const findKategori = await this.KategoriController.getKategoriById(id);

            // Jika kategori tidak ditemukan, kirim response 404
            if (findKategori.length === 0) {
                return h.response({
                    status: 'gagal',
                    message: 'Kategori Tidak Ditemukan'
                }).code(404);
            }

            // Mengupdate kategori berdasarkan ID
            const kategori = await this.KategoriController.updateKategoriByid(id, name);

            // Mengirim response berhasil beserta jumlah data yang terpengaruh
            return h.response({
                status: 'berhasil',
                message: 'Berhasil Mengedit Kategori',
                data: kategori.affectedRows
            }).code(200);

        } catch (error) {
            console.log('Server Error: ', error);
            return h.response(error).code(500);
        }
    }

    /**
     * Handler untuk menghapus kategori berdasarkan ID.
     * @param {Object} req - Objek request dari server Hapi.
     * @param {Object} h - Objek response toolkit dari server Hapi.
     * @returns {Object} - Objek response HTTP yang berisi status berhasil atau gagal, dan data yang dihapus.
     */
    deleteKategori = async (req, h) => {
        const { id } = req.params;
        try {
            // Memeriksa apakah kategori dengan ID yang diberikan ada
            const findKategori = await this.KategoriController.getKategoriById(id);

            // Jika kategori tidak ditemukan, kirim response 404
            if (findKategori.length === 0) {
                return h.response({
                    status: 'gagal',
                    message: "Kategori Tidak Ditemukan"
                }).code(404);
            }

            // Menghapus kategori berdasarkan ID
            const deleted = await this.KategoriController.deleteKategoriById(id);

            // Mengirim response berhasil beserta data yang dihapus
            return h.response({
                status: 'berhasil',
                message: 'Berhasil Menghapus Kategori',
                data: deleted
            }).code(200);

        } catch (error) {
            console.log('Server Error Coy \n', error);
            return h.response(error);
        }
    }
}

module.exports = KategoriHandler; // Ekspor kelas KategoriHandler untuk digunakan di file lain
