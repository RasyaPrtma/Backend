const { generateToken } = require('../../tokenize'); // Memanggil fungsi generateToken dari module tokenize
const bcrypt = require('bcrypt'); // Memanggil library bcrypt untuk hashing password

/**
 * Kelas untuk menangani proses autentikasi pengguna.
 */
class AuthHandler {
    /**
     * Konstruktor untuk AuthHandler.
     * @param {Object} service - Objek service yang menyediakan fungsi-fungsi autentikasi.
     */
    constructor(service) {
        this.AuthController = service;

        // Bind method agar tetap menggunakan instance AuthHandler
        this.loginHandler = this.loginHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    }

    /**
     * Handler untuk proses login pengguna.
     * @param {Object} req - Objek request dari server Hapi.
     * @param {Object} h - Objek response toolkit dari server Hapi.
     * @returns {Object} - Objek response HTTP yang berisi status dan data token.
     */
    loginHandler = async (req, h) => {
        const { email, password } = req.payload;
        try {
            // Mendapatkan data pengguna berdasarkan email
            const auth = await this.AuthController.GetUserEmail(email);

            // Jika email tidak ditemukan, kirim response 404
            if (auth.length === 0) {
                return h.response({
                    status: 'gagal',
                    message: 'email tidak ditemukan!'
                }).code(404);
            }

            // Memeriksa kecocokan password
            const checkPass = bcrypt.compareSync(password, auth[0].password);

            // Jika password benar, generate token dan kirim response berhasil
            if (checkPass) {
                const token = generateToken({
                    id: auth[0].id
                });

                return h.response({
                    status: 'berhasil',
                    message: 'berhasil login',
                    data: {
                        token,
                        username: auth[0].username
                    }
                }).code(200);
            } else {
                // Jika password salah, kirim response 400
                return h.response({
                    status: 'gagal',
                    message: 'Password Anda Salah'
                }).code(400);
            }

        } catch (err) {
            console.log('Server Error', err);
            return h.response(err).code(500);
        }
    }

    /**
     * Handler untuk proses registrasi pengguna.
     * @param {Object} req - Objek request dari server Hapi.
     * @param {Object} h - Objek response toolkit dari server Hapi.
     * @returns {Object} - Objek response HTTP yang berisi status berhasil atau gagal.
     */
    registerHandler = async (req, h) => {
        const { name, username, email, password } = req.payload;
        try {
            // Melakukan hashing password
            const passhash = bcrypt.hashSync(password, 10);

            // Memeriksa apakah email sudah terdaftar
            const cekEmail = await this.AuthController.GetUserEmail(email);

            // Jika email sudah terdaftar, kirim response 409
            if (cekEmail.length > 0) {
                return h.response({
                    status: 'gagal',
                    message: 'email sudah terdaftar!'
                }).code(409);
            }

            // Menyimpan data pengguna ke database
            await this.AuthController.Register(name, username, email, passhash);

            // Mengirim response berhasil
            return h.response({
                status: 'berhasil',
                message: 'berhasil membuat akun'
            }).code(201);
        } catch (err) {
            console.log('Server Error', err);
            return h.response(err).code(500);
        }
    }
}

module.exports = AuthHandler; // Ekspor kelas AuthHandler untuk digunakan di file lain
