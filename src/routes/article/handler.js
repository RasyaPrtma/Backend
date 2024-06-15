const fs = require('fs');
const path = require('path'); // Corrected to require 'path' module
const uploadDir = path.join(__dirname, '../../upload'); // Corrected to use `path.join`

class ArticleHandler {
    constructor(service) {
        this.ArticleController = service;

        this.uploadArticle = this.uploadArticle.bind(this);
    }

    uploadArticle = async (req, h) => {
        const { file } = req.payload;

        return new Promise((resolve, reject) => {
            const filename = file.hapi.filename;
            const fileExt = path.extname(filename);
            const randomNumber = Math.floor(Math.random() * 1000000);
            const secureFileName = `${randomNumber}${fileExt}`;
            const filePath = path.join(uploadDir, secureFileName);

            const data = file._data;
            fs.writeFile(filePath, data, err => {
                if (err) {
                    console.error('Error writing file:', err);
                    return reject(h.response({ message: 'Upload failed!' }).code(500));
                }

                // store file to database
                resolve(h.response({ message: 'Upload successfully!', fileUrl: `upload/${secureFileName}`}).code(200));
            });
        });
    }

    getImageByArticleId = async (request, h) => {
        const { articleId } = request.params;

        try {
            const filename = await this.articleService.getImageByArticleId(articleId);

            if (!filename) {
                return h.response({ error: 'File not found' }).code(404);
            }

            const filePath = path.join(__dirname, '../../upload', filename); // Sesuaikan dengan path folder upload Anda
            return h.file(filePath);
        } catch (error) {
            console.error('Error fetching file:', error);
            return h.response({ error: 'Internal server error' }).code(500);
        }
    }
}

module.exports = ArticleHandler;
