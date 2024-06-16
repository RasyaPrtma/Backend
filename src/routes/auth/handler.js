const {generateToken} = require('../../tokenize');
const bcrypt = require('bcrypt');
class AuthHandler {
    constructor(service){
        this.AuthController = service;

        this.loginHandler = this.loginHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    }

     loginHandler = async (req,h) => {
        const {email,password} = req.payload;
        try{

            
        const auth = await this.AuthController.GetUserEmail(email);

        if(auth.length == 0){
            return h.response({
                status:'gagal',
                message:'email tidak ditemukan!'
            }).code(404);
        }

        const checkPass = bcrypt.compareSync(password,auth[0].password);

        if(checkPass){
            const token = generateToken({
                id:auth[0].id
            });

            return h.response({
                status: 'berhasil',
                message: 'berhasil login',
                data: {
                    token
                }
            }).code(200);
        }else{
            return h.response({
                status:'gagal',
                message: 'Password Anda Salah'
            }).code(400);
        }

        }catch(err){
            console.log('Server Error',err);
            return h.response(err).code(500);
        }
    }

    registerHandler = async (req,h) => {
        const {name,username,email,password} = req.payload;
      try{

        const passhash = bcrypt.hashSync(password,10);

        const cekEmail = await this.AuthController.GetUserEmail(email);

        if(cekEmail.length > 0){
            return h.response({
                status:'gagal',
                message: 'email sudah terdaftar!'
            }).code(409);
        }

        await this.AuthController.Register(name,username,email,passhash);

        return h.response({
            status: 'berhasil',
            message: 'berhasil membuat akun'
        }).code(201);
      }catch(err){
        console.log('Server Error',err);
        return h.response(err).code(500)
      }
    }
}

module.exports = AuthHandler;