const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
const { variables, dotEnvConfig } = require('./env-variables');
const { ADMINS_REMOTE, CONSULTANTS_REMOTE, PORT, PUBLIC_PATH } = variables;

module.exports = {
    output: {
        publicPath: PUBLIC_PATH,
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.ts', '.tsx'],
    },

    devServer: {
        port: PORT,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
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
                test: /\.svg$/,
                use: ['@svgr/webpack'],
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
            {
                loader: 'file-loader',
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise be processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.svg$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ],
    },

    plugins: [
        new DefinePlugin({
            process: JSON.stringify({
                env: dotEnvConfig.parsed,
            }),
        }),
        new ModuleFederationPlugin({
            name: 'contacts',
            filename: 'remoteEntry.js',
            remotes: {
                admins: `admins@${ADMINS_REMOTE}`,
                consultants: `consultants@${CONSULTANTS_REMOTE}`,
                contacts: `contacts@${PUBLIC_PATH}remoteEntry.js`,
            },
            exposes: {
                './CandidateProposal': './src/views/CandidateProposal',
            },
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
        new HtmlWebPackPlugin({
            template: './public/index.html',
        }),
    ],
};
