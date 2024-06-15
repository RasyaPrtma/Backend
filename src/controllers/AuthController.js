class AuthController{
    constructor(pool){
        this.pool = pool;
    }

    Register = async (name,username,email,password) => {
        const [result] = await this.pool.execute(`INSERT INTO users (name,username,email,password) VALUES (:name,:username,:email,:password)`,{name,username,email,password});
        return result.insertId
    }

    GetUserEmail = async (email) => {
        const [result] = await this.pool.query(`SELECT * FROM users WHERE email = :email`, {email});
        return result;
    }
}

module.exports = AuthController;