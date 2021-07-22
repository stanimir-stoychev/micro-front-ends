import path from 'path';
import { config } from 'dotenv';

// Will add values from .env (file) to process.env
const dotEnvConfig = config({ encoding: 'utf8', path: path.resolve(__dirname, '../.env') });

function generateEnvVariables() {
    const {
        ADMINS_REMOTE = 'http://localhost:3000/remoteEntry.js',
        BUILD_FOLDER = '../build',
        CONSULTANTS_REMOTE = 'http://localhost:3002/remoteEntry.js',
        CONTACTS_REMOTE = 'http://localhost:3003/remoteEntry.js',
        HOSTNAME = '0.0.0.0', // 0.0.0.0 allows us to access the app over Wi-Fi
        PORT = '3003',
        PUBLIC_PATH = 'http://localhost:3003/',
    } = process.env;

    return {
        ADMINS_REMOTE,
        BUILD_FOLDER: path.resolve(__dirname, BUILD_FOLDER),
        CONSULTANTS_REMOTE,
        CONTACTS_REMOTE,
        HOSTNAME,
        PORT: Number.parseInt(PORT, 10),
        PUBLIC_PATH,
    };
}

export { dotEnvConfig };
export default generateEnvVariables();
