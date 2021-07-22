const path = require('path');
const { config } = require('dotenv');

// Will add values from `.env` to `process.env`
const dotEnvConfig = config({ encoding: 'utf8', path: path.resolve(__dirname, './.env') });

function generateEnvVariables() {
    let ENV = 'none';
    const {
        BUILD_FOLDER = './build',
        CONSULTANTS_REMOTE = 'http://localhost:3001/remoteEntry.js',
        CONTACTS_REMOTE = 'http://localhost:3002/remoteEntry.js',
        NODE_ENV = '',
        PORT = '3000',
        PUBLIC_PATH = 'http://localhost:3000/',
        TRANSLATIONS_REMOTE = 'http://localhost:3009/remoteEntry.js',
    } = process.env;

    switch (NODE_ENV.toLowerCase()) {
        case 'prod':
        case 'production':
            ENV = 'production';
            break;

        case 'dev':
        case 'development':
            ENV = 'development';
            break;

        default:
            ENV = 'none';
    }

    return {
        BUILD_FOLDER: path.resolve(__dirname, BUILD_FOLDER),
        CONSULTANTS_REMOTE,
        CONTACTS_REMOTE,
        NODE_ENV: ENV,
        PORT: Number.parseInt(PORT, 10),
        PUBLIC_PATH,
        TRANSLATIONS_REMOTE,
    };
}

exports.dotEnvConfig = dotEnvConfig;
exports.variables = generateEnvVariables();
