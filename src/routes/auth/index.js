const AuthHandler = require('./handler');
const routes = require('./routes');

const authPlugin = {
    name: 'auth',
    version: '1.0.0',
    register: async(server, { service }) => {
        const handler = new AuthHandler(service);
        const AuthRoute = routes(handler);
        server.route(AuthRoute);
    }
}

module.exports = authPlugin;