const ArticleHandler = require('./handler');
const routes = require('./routes');

const articlePlugin = {
    name: 'article',
    version: '1.0.0',
    register: async(server, {service}) => {
        const handler = new ArticleHandler(service);
        const ArticleRoute = routes(handler);
        server.route(ArticleRoute);
    }
}

module.exports = articlePlugin;