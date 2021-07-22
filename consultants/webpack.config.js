const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
const { variables, dotEnvConfig } = require('./env-variables');
const { ADMINS_REMOTE, BUILD_FOLDER, CONTACTS_REMOTE, PUBLIC_PATH, TRANSLATIONS_REMOTE } = variables;

module.exports = {
    mode: 'production',
    output: {
        path: BUILD_FOLDER,
        publicPath: PUBLIC_PATH,
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
    },

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/typescript', '@babel/preset-react'],
                    },
                },
            },
        ],
    },

    plugins: [
        new ESLintPlugin({ extensions: ['.jsx', '.js', '.ts', '.tsx'] }),
        new DefinePlugin({
            process: JSON.stringify({
                env: dotEnvConfig.parsed,
            }),
        }),
        new ModuleFederationPlugin({
            name: 'consultants',
            filename: 'remoteEntry.js',
            remotes: {
                admins: `admins@${ADMINS_REMOTE}`,
                consultants: `consultants@${PUBLIC_PATH}remoteEntry.js`,
                contacts: `contacts@${CONTACTS_REMOTE}`,
                translations: `translations@${TRANSLATIONS_REMOTE}`,
            },
            exposes: {},
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
            },
        }),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html',
        }),
    ],
};
