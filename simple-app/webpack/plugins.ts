import { Configuration, DefinePlugin } from 'webpack';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import DashboardPlugin from '@module-federation/dashboard-plugin';

import packageJson from '../package.json';
import ENV, { dotEnvConfig } from './env';
import PATHS from './paths';

const HTML_PLUGIN_OPTIMIZATIONS = {
    minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
    },
};

export default (mode: Configuration['mode']): Configuration['plugins'] => {
    const IS_PRODUCTION = mode === 'production';
    const sharedDependencies = (packageJson as any).dependencies || {};

    return [
        new ModuleFederationPlugin({
            name: 'simple-app',
            filename: 'remoteEntry.js',
            remotes: {
                core: `core@${ENV.REMOTE_CORE}`,
            },
            exposes: {},
            shared: {
                ...sharedDependencies,
            },
        }),
        new DefinePlugin({
            process: JSON.stringify({
                env: dotEnvConfig.parsed,
            }),
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `${PATHS.PUBLIC}/index.html`,
            filename: './index.html',
            ...(IS_PRODUCTION && HTML_PLUGIN_OPTIMIZATIONS),
        }),
        // new DashboardPlugin({
        //     dashboardURL: 'http://localhost:3000/api/update',
        // }),
    ];
};
