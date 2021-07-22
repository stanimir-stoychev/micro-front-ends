import { Configuration } from 'webpack';

export default (mode: Configuration['mode']): Configuration['module'] => ({
    rules: [
        {
            test: /\.m?js/,
            type: 'javascript/auto',
            resolve: {
                fullySpecified: false,
            },
        },
        {
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        },
    ],
});
