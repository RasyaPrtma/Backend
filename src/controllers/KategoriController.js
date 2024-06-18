class KategoriController{
    constructor(pool){
        this.pool = pool;
    }

    addKategori = async (name) => {
        const [result] = await this.pool.execute(`INSERT INTO kategoris (name) VALUES (?)`, [name]);
        return result;
    }

    getAllKategori = async () => {
        const [result] = await this.pool.query('SELECT * FROM kategoris');
        return result;
    }

    getKategoriByName = async (name) =>{
        const [result] = await this.pool.query(`SELECT * FROM kategoris WHERE name = ?`, [name]);
        return result;
    }

    getKategoriById = async (id) => {
        const [result] = await this.pool.query('SELECT * FROM kategoris WHERE id = :id',{id});
        return result;
    }

    updateKategoriByid = async (id,name) =>{
        const [result] = await this.pool.execute('UPDATE kategoris SET name = ? WHERE id = ?', [name, id]);
        return result;
    }

    deleteKategoriById = async (id) => {
        const [result] = await this.pool.execute('DELETE FROM kategoris WHERE id = :id',{id});
        return result;
    }
}

module.exports = KategoriController;