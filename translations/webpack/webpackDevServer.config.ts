import { Configuration } from 'webpack-dev-server';
import ENV from './env';

const { PORT, PUBLIC_PATH } = ENV;

export default {
    contentBase: PUBLIC_PATH,
    contentBasePublicPath: '/',
    port: PORT,
    historyApiFallback: true,
    quiet: true,
    liveReload: true,
} as Configuration;
