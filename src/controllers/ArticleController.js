/**
 * Controller untuk mengelola artikel.
 */
class ArticleController {
    /**
     * @param {Object} pool - Pool koneksi database.
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Menambahkan artikel baru ke database.
     * @param {string} title - Judul artikel.
     * @param {string} article - Isi artikel.
     * @param {number} users_id - ID pengguna.
     * @param {string} filename - Nama file gambar.
     * @param {string} path - Path file gambar.
     * @param {number} kategoris - ID kategori.
     * @returns {Promise<Object>} Hasil eksekusi query.
     */
    addArticle = async (title, article, users_id, filename, path, kategoris) => {
        const [result] = await this.pool.execute(
            `INSERT INTO article (title, article, users_id, filename, path, kategoris_id) VALUES (?,?,?,?,?,?)`,
            [title, article, users_id, filename, path, kategoris]
        );
        return result;
    }

    /**
     * Mendapatkan semua artikel dari database.
     * @returns {Promise<Array>} Daftar semua artikel.
     */
    getAllArticle = async () => {
        const [result] = await this.pool.query(`SELECT * FROM article`);
        return result;
    }

    /**
     * Mendapatkan artikel berdasarkan ID.
     * @param {number} id - ID artikel.
     * @returns {Promise<Object>} Artikel yang ditemukan.
     */
    getArticleById = async (id) => {
        const [result] = await this.pool.query(`SELECT * FROM article WHERE id = ${id}`);
        return result;
    }

    /**
     * Mendapatkan artikel berdasarkan ID pengguna.
     * @param {number} id - ID pengguna.
     * @returns {Promise<Array>} Daftar artikel yang dimiliki oleh pengguna.
     */
    getArticleByUserId = async (id) => {
        const [result] = await this.pool.query('SELECT * FROM article WHERE users_id = :id', { id });
        return result;
    }

    /**
     * Mendapatkan artikel berdasarkan ID kategori.
     * @param {number} id - ID kategori.
     * @returns {Promise<Array>} Daftar artikel yang sesuai dengan kategori.
     */
    getArticleByKategoriId = async (id) => {
        const [result] = await this.pool.query('SELECT * FROM article WHERE kategoris_id = :id', { id });
        return result;
    }

    /**
     * Memperbarui artikel berdasarkan ID.
     * @param {number} id - ID artikel.
     * @param {string} title - Judul artikel.
     * @param {string} article - Isi artikel.
     * @param {number} users_id - ID pengguna.
     * @param {string} filename - Nama file gambar.
     * @param {string} path - Path file gambar.
     * @param {number} kategoris - ID kategori.
     * @returns {Promise<Object>} Hasil eksekusi query.
     */
    updateArticleById = async (id, title, article, users_id, filename, path, kategoris) => {
        const [result] = await this.pool.execute(
            `UPDATE article SET title=?, article=?, users_id=?, filename=?, path=?, kategoris_id=? WHERE id = ?`,
            [title, article, users_id, filename, path, kategoris, id]
        );
        return result;
    };

    /**
     * Menghapus artikel berdasarkan ID.
     * @param {number} id - ID artikel.
     * @returns {Promise<Object>} Hasil eksekusi query.
     */
    deleteArticleById = async (id) => {
        const [result] = await this.pool.execute(`DELETE FROM article WHERE id = ${id}`);
        return result;
    }

    /**
     * Mencari artikel berdasarkan judul.
     * @param {string} name - Nama atau judul artikel yang dicari.
     * @returns {Promise<Array>} Daftar artikel yang cocok dengan pencarian.
     */
    searchArticle = async (name) => {
        const [result] = await this.pool.query(`SELECT * FROM article WHERE title LIKE ?`, [`%${name}%`]);
        return result;
    }

    /**
     * Mengurutkan artikel berdasarkan kolom dan tipe urutan.
     * @param {string} name - Nama kolom yang dijadikan dasar pengurutan.
     * @param {string} type - Tipe urutan (ASC atau DESC).
     * @returns {Promise<Array>} Daftar artikel yang diurutkan.
     */
    sortingArticle = async (name, type) => {
        const [result] = await this.pool.query(`SELECT * FROM article ORDER BY ${name} ${type}`);
        return result;
    }

    /**
     * Memfilter artikel berdasarkan kategori.
     * @param {number} kategori - ID kategori.
     * @returns {Promise<Array>} Daftar artikel yang sesuai dengan kategori.
     */
    filterArticle = async (kategori) => {
        const [result] = await this.pool.query(`SELECT * FROM article WHERE kategoris_id = ${kategori}`);
        return result;
    }
}

module.exports = ArticleController;
