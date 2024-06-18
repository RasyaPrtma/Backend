/**
 * Controller untuk mengelola autentikasi pengguna.
 */
class AuthController {
    /**
     * @param {Object} pool - Pool koneksi database.
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Mendaftarkan pengguna baru ke database.
     * @param {string} name - Nama pengguna.
     * @param {string} username - Username pengguna.
     * @param {string} email - Email pengguna.
     * @param {string} password - Kata sandi pengguna.
     * @returns {Promise<number>} ID pengguna yang baru didaftarkan.
     */
    Register = async (name, username, email, password) => {
        const [result] = await this.pool.execute(
            `INSERT INTO users (name, username, email, password) VALUES (:name, :username, :email, :password)`,
            { name, username, email, password }
        );
        return result.insertId;
    }

    /**
     * Mendapatkan data pengguna berdasarkan email.
     * @param {string} email - Email pengguna.
     * @returns {Promise<Object>} Data pengguna yang ditemukan.
     */
    GetUserEmail = async (email) => {
        const [result] = await this.pool.query(
            `SELECT * FROM users WHERE email = :email`,
            { email }
        );
        return result;
    }
}

module.exports = AuthController;
