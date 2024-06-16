const kategoriHandler = require("./handler");
const routes = require("./routes");

const kategoriPlugin = {
    name:"kategori",
    version:'1.0.0',
    register: async (server,{service}) => {
        const handler = new kategoriHandler(service);
        const route = routes(handler);
        server.route(route);
    }
}

module.exports = kategoriPlugin