require('dotenv').config();

const hapi = require('@hapi/hapi');
const jwt = require('@hapi/jwt')
const pool = require('./models');

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
        port:4000,
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

    server.auth.strategy('api_jwt','jwt',{
        keys: '882cf3826475aeec414d83cfc3d34751051a2ed50e6e4b0190083eae78e01373207dd3e1644c65d5b45b07bf929533e42f0b3901300b87915b5cf604ce0fa061',
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: 84000
        },
        validate: (artifacts) => {
            console.log("ARTIFACTS ", artifacts.decoded)
            return ({
                isValid: true,
                credentials: {
                    id: artifacts.decoded.payload.id,
                }
            })
        }
    });

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
