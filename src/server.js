// Memuat konfigurasi dari file .env
require('dotenv').config();

// Memuat modul Hapi untuk membuat server HTTP
const hapi = require('@hapi/hapi');

// Memuat modul untuk JWT dari Hapi
const jwt = require('@hapi/jwt');

// Memuat modul pool untuk koneksi database
const pool = require('./models');

// Memuat modul inert untuk menangani file statis
const inert = require('@hapi/inert');

// Memuat plugin untuk manajemen autentikasi
const authPlugin = require('./routes/auth');

// Memuat plugin untuk manajemen artikel
const articlePlugin = require('./routes/article');

// Memuat plugin untuk manajemen kategori
const kategoriPlugin = require('./routes/kategori');

// Memuat controller untuk manajemen autentikasi
const AuthController = require('./controllers/AuthController');

// Memuat controller untuk manajemen artikel
const ArticleController = require('./controllers/ArticleController');

// Memuat controller untuk manajemen kategori
const KategoriController = require('./controllers/KategoriController');

// Inisialisasi fungsi async
const init = async () => {

    // Inisialisasi controller dengan menggunakan pool database
    const Auth = new AuthController(pool);
    const Article = new ArticleController(pool);
    const Kategori = new KategoriController(pool);

    // Inisialisasi server Hapi
    const server = hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            // Konfigurasi CORS untuk menerima request dari semua origin
            cors: {
                origin: ['*']
            }
        }
    });

    // Registrasi plugin JWT untuk mengelola token
    await server.register([
        {
            plugin: jwt
        }
    ]);

    // Konfigurasi strategi autentikasi JWT
    server.auth.strategy('api_jwt', 'jwt', {
        keys: process.env.JWT_SECRET, // Secret key untuk signing JWT
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: 86400 // Maksimum umur token dalam detik (1 hari)
        },
        // Fungsi untuk memvalidasi token JWT
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            }
        })
    });

    // Registrasi plugin inert untuk menangani file statis
    await server.register(inert);

    // Registrasi plugin-plugin untuk manajemen autentikasi, artikel, dan kategori
    await server.register([
        {
            plugin: authPlugin,
            options: {
                service: Auth, // Mengirimkan service AuthController ke plugin autentikasi
            }
        },
        {
            plugin: articlePlugin,
            options: {
                service: Article, // Mengirimkan service ArticleController ke plugin artikel
                serviceKategori: Kategori // Mengirimkan service KategoriController ke plugin artikel
            }
        },
        {
            plugin: kategoriPlugin,
            options: {
                service: Kategori // Mengirimkan service KategoriController ke plugin kategori
            }
        }
    ]);

    // Memulai server Hapi
    await server.start();

    console.log(`Server Berjalan Pada Server ${server.info.uri}`);
};

// Memanggil fungsi init untuk menjalankan server
init();
