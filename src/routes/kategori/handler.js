class kategoriHandler{
    constructor(service){
        this.KategoriController = service;
    }

    uploadKategori = async (req,h) => {
        const {name} = req.payload;
        try{

            const findKategori = await this.KategoriController.getKategoriByName(name);

            console.log(findKategori);

            if(findKategori.length > 0){
                return h.response({status:'pending',message:'Kategori Sudah Ada!'});
            }

            await this.KategoriController.addKategori(name);

            return h.response({
                status:'berhasil',
                message:'Berhasil Membuat Kategori'
            }).code(201);

        }catch(error){
            console.log('Error Server: ',error);
            return h.response(error).code(500);
        }
    }

    getAll = async (req,h) => {
        try{

            const kategori = await this.KategoriController.getAllKategori();

            console.log(kategori);

            if(kategori.length == 0){
                return  h.response({
                    status:'pending',
                    message:'Kategori Kosong!'
                }).code(204);
            }

            return h.response({
                status:'berhasil',
                message:'Berhasil Mendapatkan Kategori',
                data: kategori
            }).code(200);

        }catch(error){
            console.log('Error Server: ',error);
            return h.response(error).code(500);
        }
    }

    getKategoriId = async (req,h) => {
        const {id} = req.params;
        try{

            const data = await this.KategoriController.getKategoriById(id);

            if(data.length == 0){
                return h.response({status:'gagal',message:'Kategori Tidak Ditemukan'}).code(404);
            }

            return h.response({
                status: 'berhasil',
                message:'Berhasil Mendapatkan Kategori',
                data: data.affectedRows
            }).code(200)

        }catch(error){
            console.log('Server Error', error);
            return h.response(error).code(500);
        }
    }

    editKategori = async (req,h) => {
        const {name} = req.payload;
        const {id} = req.params;
        try{

            const findKategori = await this.KategoriController.getKategoriById(id);

            if(findKategori.length == 0){
                return h.response({
                    status:'gagal',
                    message:'Kategori Tidak Ditemukan'
                }).code(404);
            }

           const kategori = await this.KategoriController.updateKategoriByid(id,name);

            return h.response({
                status:'berhasil',
                message:'Berhasil Mengedit Kategori',
                data: kategori.affectedRows
            }).code(200);

        }catch(error){
            console.log('Server Error: ',error);
            return h.response(error).code(500);
        }
    }

    deleteKategori = async (req,h) => {
        const {id} = req.params;
        try{

            const findKategori = await this.KategoriController.getKategoriById(id);

            if(findKategori.length == 0){
                return h.response({
                    status: 'gagal',
                    message:"Kategori Tidak Ditemukan"
                }).code(404);
            }

            const deleted = await this.KategoriController.deleteKategoriById(id);

            return h.response({
                status: 'berhasil',
                message: 'Berhasil Menghapus Kategori',
                data: deleted
            }).code(200);

        }catch(error){
            console.log('Server Error',error);
            return h.response(error);
        }
    }

}

module.exports = kategoriHandler;