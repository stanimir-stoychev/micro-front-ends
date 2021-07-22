import { Configuration } from 'webpack';
import buildModule from './module';
import buildPlugins from './plugins';
import ENV from './env';

const { PUBLIC_PATH } = ENV;

export default (mode: Configuration['mode']): Configuration => ({
    mode,
    output: {
        publicPath: PUBLIC_PATH,
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
    },

    devtool: mode === 'production' ? 'source-map' : 'eval',
    module: buildModule(mode),
    plugins: buildPlugins(mode),
});
