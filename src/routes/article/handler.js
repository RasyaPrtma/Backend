const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../../upload'); 
const bcrypt = require('bcrypt');

class ArticleHandler {
    constructor(service,serviceKategori) {
        this.ArticleController = service;
        this.KategoriController = serviceKategori;

        this.uploadArticle = this.uploadArticle.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.deleteArticleById = this.deleteArticleById.bind(this);
        this.downloadImage = this.downloadImage.bind(this);
        this.getAllArticles = this.getAllArticles.bind(this);
        this.updateArticleById = this.updateArticleById.bind(this);
        this.getArticleById = this.getArticleById.bind(this);
        this.searchArticleByName = this.searchArticleByName.bind(this);
        this.sortArticle = this.sortArticle.bind(this);
    }

    addArticle = async (title,article,id,filename,path,kategori) =>{
        const data = await this.ArticleController.addArticle(title,article,id,filename,path,kategori);
        return data;
    }

    uploadArticle = async (req, h) => {
        const { title, article, file ,kategori} = req.payload;
        const { id } = req.auth.credentials;
        try {
            const categoris = await this.KategoriController.getKategoriByName(kategori);

            console.log(categoris);

            if(categoris.length == 0){
                return h.response({
                    status:'gagal',
                    message:'Kategori Tidak Ditemukan'
                }).code(404);
            }

            const filename = file.hapi.filename;
            const fileExt = path.extname(filename);
    
            const timestamp = Date.now().toString(); 
            const hash = await bcrypt.hash(timestamp, 10);
            const secureFileName = `${hash}${fileExt}`;
            const filePath = path.join(uploadDir, secureFileName);
            
            const data = file._data;
            await fs.promises.writeFile(filePath, data, 'binary');
    
            this.addArticle(title, article, id, secureFileName, filePath,categoris[0].id);
    
            return h.response({
                status: 'berhasil',
                message: 'Berhasil Mengupload Article',
                data: {
                    title: title,
                    article: article,
                    foto: secureFileName,
                    kategori:categoris[0].name
                }
            }).code(201);
        } catch (err) {
            return h.response({ status: 'gagal', message: 'Upload gagal!' }).code(500);
        }
    }
    getArticleById = async (request, h) => {
        const { id } = request.params;
    
        try {
            const article = await this.ArticleController.getArticleById(id);
    
            if (!article || !article[0]) {
                return h.response({ error: 'Article Tidak Ditemukan!' }).code(404);
            }
    
            const articleData = {
                id: article[0].id,
                title: article[0].title,
                content: article[0].article,
            };
    
            if (typeof article[0].filename === 'string') {
                articleData.filename = article[0].filename;
            }
    
            return h.respnse({
                status: 'berhasil',
                message: 'Article retrieved successfully',
                data: {
                    article: articleData
                }
            });
        } catch (error) {
            console.log(error);
            return h.response({ error: 'Server Error' }).code(500);
        }
    };

    getArticleUser = async (req,h) => {
        const {id} = req.auth.credentials;
        try{

            const article = await this.ArticleController.getArticleByUserId(id);

            if(article.length == 0){
                return h.response({status:'pedding',message:'Article Kosong'}).code(209);
            }

            return h.response({
                status:'berhasil',
                message:"Berhasil Mengambil Article",
                data: article
            }).code(200);

        }catch(error){
            console.log('server error: ',error);
            return h.response(error).code(500);
        }
    }

    getArticleByKategori = async (req,h) => {
        const {id} = req.params;
        try{

            const article = await this.ArticleController.getArticleByKategoriId(id);

            if(article.length == 0){
                return h.response({
                    status:'pending',
                    message:'Article Tidak Ditemukan'
                }).code(209)
            }

            return h.response({
                status:'berhasil',
                message:'Berhasil Mendapatkan Article',
                data: article
            }).code(200);

        }catch(error){
            console.log('Server Error:',error);
            return h.response(error);
        }
    }
    
    downloadImage = async (request, h) => {
        const { id } = request.params;
    
        try {
            const article = await this.ArticleController.getArticleById(id);
    
            if (!article || !article[0] || typeof article[0].filename !== 'string') {
                return h.response({ error: 'Article Tidak Ditemukan atau File tidak tersedia' }).code(404);
            }
    
            const filePath = path.join(uploadDir, article[0].filename);
    
            try {
                await fs.promises.access(filePath);
            } catch (err) {
                return h.response({ error: 'File tidak ditemukan' }).code(404);
            }
    
            const fileStream = fs.createReadStream(filePath);
    
            const response = h.response(fileStream);
            response.type('image/jpeg'); // Adjust content type as needed
            response.header('Content-Disposition', `attachment; filename="${article[0].filename}"`);
    
            return response;
        } catch (error) {
            console.log(error);
            return h.response({ error: 'Server Error' }).code(500);
        }
    };

    updateArticleById = async (request, h) => {
        const { idArticle } = request.params;
        const { title, article, image , kategori} = request.payload;
        const { id } = request.auth.credentials;
    
        try {
            const existingArticle = await this.ArticleController.getArticleById(idArticle);
    
            if (!existingArticle || !existingArticle[0]) {
                return h.response({ error: 'Article tidak ditemukan' }).code(404);
            }
    
            let deletedOldImage = false;
    
            if (image && image.hapi) {
                const fileData = image._data;
    
                if (!fileData || !Buffer.isBuffer(fileData)) {
                    throw new Error('Data file yang diunggah tidak valid.');
                }
    
                const filename = image.hapi.filename;
                const fileExt = path.extname(filename);
    
                const timestamp = Date.now().toString();
                const hash = await bcrypt.hash(timestamp, 10);
                const secureFileName = `${hash}${fileExt}`;
                const filePath = path.join(uploadDir, secureFileName);
    
                await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    
                await fs.promises.writeFile(filePath, fileData);
    
                updatedArticle = await this.ArticleController.updateArticleById(idArticle,
                    title,
                    article,
                    id,
                    secureFileName,
                    filePath,
                    kategori
                );
    
                if (existingArticle[0].filename) {
                    const oldFilePath = path.join(uploadDir, existingArticle[0].filename);
                    await fs.promises.unlink(oldFilePath);
                    deletedOldImage = true;
                }
            } else {
                updatedArticle = await this.ArticleController.updateArticleById(idArticle,
                    title,
                    article,
                    id,
                    existingArticle[0].filename,
                    existingArticle[0].path,
                    existingArticle[0].kategoris_id
                );
            }
    
            return h.response({
                status: 'berhasil',
                message: 'Article Berhasil Di Update',
                deletedOldImage: deletedOldImage
            }).code(200);
        } catch (error) {
            console.error('Error:', error);
            return h.response({ error: 'Server Error' }).code(500);
        }
    };
    
    deleteArticleById = async (request, h) => {
        const { id } = request.params;
    
        try {
            const existingArticle = await this.ArticleController.getArticleById(id);
    
            if (!existingArticle || !existingArticle[0]) {
                return h.response({ error: 'Article tidak ditemukan' }).code(404);
            }
    
            await this.ArticleController.deleteArticleById(id);
    
            if (existingArticle[0].filename) {
                const filePath = path.join(uploadDir, existingArticle[0].filename);
                try {
                    await fs.promises.unlink(filePath);
                } catch (err) {
                    console.error('Error delete files', err);
                }
            }
    
            return h.response({
                status: 'berhasil',
                message: 'Article berhasil dihapus'
            }).code(200);
        } catch (error) {
            console.error('Error:', error);
            return h.response({ error: 'Server Error' }).code(500);
        }
    };

    getAllArticles = async (request, h) => {
        try {
            const articles = await this.ArticleController.getAllArticle();
    
            if (!articles || articles.length === 0) {
                return h.response({ error: 'Tidak ada artikel yang ditemukan' }).code(404);
            }
    
            const articlesData = articles.map(article => ({
                id: article.id,
                title: article.title,
                content: article.article,
                filename: article.filename
            }));
    
            return h.response({
                status: 'berhasil',
                message: 'Artikel berhasil diambil',
                data: {
                    articles: articlesData
                }
            }).code(200);
        } catch (error) {
            console.error('Error:', error);
            return h.response({ error: 'Server Error' }).code(500);
        }
    };

    searchArticleByName = async (req,h) => {
        const {name} = req.params;
        try{
            const data = await this.ArticleController.searchArticle(name);

            if(data.length == 0){
                return h.response({
                    status: 'pending',
                    message: 'Article Tidak Ditemukan'
                }).code(209);
            }

            return h.response({
                status:'berhasil',
                message: 'Artikel Berhasil diambil',
                data: data
            }).code(200);

        }
        catch(error){
            console.log('Server Error : ',error);
            return h.response(error).code(500);
        }
    }

    sortArticle = async (req,h) => {
        const {name,type} = req.params;
        try{
            const data = await this.ArticleController.sortingArticle(name,type);

            if(data.length == 0){
                return h.response({
                    status: 'gagal',
                    message: 'article tidak ditemukan'
                }).code(209);
            }

            return h.response({
                status:'berhasil',
                message:'Artikel berhasil diambil',
                data: data
            })
        }catch(err){
            console.log('Server Error',err);
            return h.response(err);
        }
    }
}

module.exports = ArticleHandler;
