/**
 * Controller untuk mengelola kategori.
 */
class KategoriController {
    /**
     * @param {Object} pool - Pool koneksi database.
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Menambahkan kategori baru ke database.
     * @param {string} name - Nama kategori.
     * @returns {Promise<Object>} Hasil dari query insert.
     */
    addKategori = async (name) => {
        const [result] = await this.pool.execute(
            `INSERT INTO kategoris (name) VALUES (?)`,
            [name]
        );
        return result;
    }

    /**
     * Mendapatkan semua kategori dari database.
     * @returns {Promise<Array>} Daftar semua kategori.
     */
    getAllKategori = async () => {
        const [result] = await this.pool.query('SELECT * FROM kategoris');
        return result;
    }

    /**
     * Mendapatkan kategori berdasarkan nama.
     * @param {string} name - Nama kategori.
     * @returns {Promise<Object>} Data kategori yang ditemukan.
     */
    getKategoriByName = async (name) => {
        const [result] = await this.pool.query(
            `SELECT * FROM kategoris WHERE name = ?`,
            [name]
        );
        return result;
    }

    /**
     * Mendapatkan kategori berdasarkan ID.
     * @param {number} id - ID kategori.
     * @returns {Promise<Object>} Data kategori yang ditemukan.
     */
    getKategoriById = async (id) => {
        const [result] = await this.pool.query(
            'SELECT * FROM kategoris WHERE id = :id',
            { id }
        );
        return result;
    }

    /**
     * Memperbarui kategori berdasarkan ID.
     * @param {number} id - ID kategori.
     * @param {string} name - Nama kategori baru.
     * @returns {Promise<Object>} Hasil dari query update.
     */
    updateKategoriByid = async (id, name) => {
        const [result] = await this.pool.execute(
            'UPDATE kategoris SET name = ? WHERE id = ?',
            [name, id]
        );
        return result;
    }

    /**
     * Menghapus kategori berdasarkan ID.
     * @param {number} id - ID kategori.
     * @returns {Promise<Object>} Hasil dari query delete.
     */
    deleteKategoriById = async (id) => {
        const [result] = await this.pool.execute(
            'DELETE FROM kategoris WHERE id = :id',
            { id }
        );
        return result;
    }
}

module.exports = KategoriController;
