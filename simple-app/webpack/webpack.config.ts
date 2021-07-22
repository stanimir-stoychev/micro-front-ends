import { Configuration } from 'webpack';
import ENV from './env';
import PATHS from './paths';
import buildModuleConfig from './module';
import buildPluginsConfig from './plugins';

function buildOptimizationsConfig(mode: Configuration['mode']): Configuration['optimization'] {
    return undefined;
}

export default (mode: Configuration['mode']): Configuration => {
    const isProduction = mode === 'production';

    return {
        mode,
        entry: PATHS.SRC_INDEX,
        output: {
            path: PATHS.BUILD,
            filename: '[name].js',
            chunkFilename: '[name].js',
            publicPath: ENV.PUBLIC_URL,
            ...(isProduction && { path: PATHS.BUILD }),
            ...(!!PATHS.PUBLIC && isProduction && { publicPath: PATHS.PUBLIC }),
        },

        module: buildModuleConfig(mode),
        optimization: buildOptimizationsConfig(mode),
        plugins: buildPluginsConfig(mode),

        devtool: mode !== 'production' ? 'cheap-module-source-map' : 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: [PATHS.SRC, 'node_modules'],
        },
    };
};
