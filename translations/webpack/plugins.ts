import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';

import packageJson from '../package.json';
import ENV, { dotEnvConfig } from './env';

const { dependencies } = packageJson;
const { ADMINS_REMOTE, CONSULTANTS_REMOTE, CONTACTS_REMOTE, PUBLIC_PATH } = ENV;

export default (mode: Configuration['mode']): Configuration['plugins'] => [
    new ESLintPlugin({ extensions: ['.jsx', '.js', '.ts', '.tsx'] }),
    new DefinePlugin({
        process: JSON.stringify({
            env: dotEnvConfig.parsed,
        }),
    }),
    new ModuleFederationPlugin({
        name: 'translations',
        filename: 'remoteEntry.js',
        remotes: {
            admins: `admins@${ADMINS_REMOTE}`,
            consultants: `consultants@${CONSULTANTS_REMOTE}`,
            contacts: `contacts@${CONTACTS_REMOTE}remoteEntry.js`,
            translations: `translations@${PUBLIC_PATH}remoteEntry.js`,
        },
        exposes: {
            './Provider': './src/components/Provider',
            './Translation': './src/components/Translation',
        },
        shared: {
            ...dependencies,
            react: {
                singleton: true,
                requiredVersion: dependencies.react,
            },
            'react-dom': {
                singleton: true,
                requiredVersion: dependencies['react-dom'],
            },
        },
    }),
    new HtmlWebPackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
    }),
];
