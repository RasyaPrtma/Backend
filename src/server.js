require('dotenv').config();

const hapi = require('@hapi/hapi');
const jwt = require('@hapi/jwt')
const pool = require('./models');
const inert = require('@hapi/inert'); 


// Plugins
const authPlugin = require('./routes/auth');
const articlePlugin = require('./routes/article');

 // Controller
 const AuthController = require('./controllers/AuthController');  
const ArticleController = require('./controllers/ArticleController');


// Init
const init = async () => {

    // Controller 
    const Auth = new AuthController(pool);
    const Article = new ArticleController(pool);

    // Server

    const server = hapi.server({
        port:3000,
        host: 'localhost',
        routes:{
            cors:{
                origin: ['*']
            }
        }
    });

    await server.register([
        {
            plugin: jwt
        }
    ]);

    server.auth.strategy('api_jwt', 'jwt', {
        keys: process.env.JWT_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: 86400
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            }
        })
    })

    await server.register(inert);
    

    await server.register([
        {
            plugin: authPlugin,
            options:{
                service: Auth,
            }
            
        },
        {
            plugin: articlePlugin,
            options:{
                service: Article
            }
        }
    ]);

    
    await server.start();

    console.log(`Server Berjalan Pada Server ${server.info.uri}`);
}
init()
