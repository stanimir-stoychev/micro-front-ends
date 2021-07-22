import { Configuration } from 'webpack-dev-server';
import ENV from './env';

export default (): Configuration => ({
    compress: true,
    historyApiFallback: true,
    host: ENV.HOST,
    hot: false,
    liveReload: true,
    port: ENV.PORT,
    quiet: true,
});
