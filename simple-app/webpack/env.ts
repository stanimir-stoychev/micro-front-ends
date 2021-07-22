import { config } from 'dotenv';
import { Configuration } from 'webpack';

import PATHS from './paths';

// Will add values from `.env` to `process.env`
const dotEnvConfig = config({ encoding: 'utf8', path: PATHS.DOT_ENV });

function generateEnvVariables() {
    let ENV: Configuration['mode'] = 'none';
    const {
        BUILD_FOLDER = './build',
        HOST = '0.0.0.0',
        NODE_ENV = '',
        PORT = '3000',
        PUBLIC_URL = 'http://localhost:3000/',
        REMOTE_CORE = 'http://localhost:3000/remoteEntry.js',
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
        BUILD_FOLDER,
        HOST,
        NODE_ENV: ENV,
        PORT: Number(PORT),
        PUBLIC_URL,
        REMOTE_CORE,
    };
}

export { dotEnvConfig };
export default generateEnvVariables();
