class ArticleController {
    constructor(pool) {
        this.pool = pool;
    }

    addArticle = async (title, article, users_id, filename, path) => {
        const [result] = await this.pool.execute(`INSERT INTO article (title,article,users_id,filename,path) VALUES (?,?,?,?,?)`, [title, article, users_id, filename, path]);
        return result;
    }

    getAllArticle = async () => {
        const [result] = await this.pool.query(`SELECT * FROM article`);
        return result;
    }

    getArticleById = async (id) => {
        const [result] = await this.pool.query(`SELECT *  FROM article WHERE id = ${id}`);
        return result;
    }

    updateArticleById = async (id, title, article, users_id, filename, path) => {
        const [result] = await this.pool.execute(
            `UPDATE article SET title=?, article=?, users_id=?, filename=?, path=? WHERE id = ?`,
            [title, article, users_id, filename, path, id]
        );
        return result;
    };

    deleteArticleById = async (id) => {
        const [result] = await this.pool.execute(`DELETE FROM article WHERE id = ${id}`);
        return result;
    }
}

module.exports = ArticleController;