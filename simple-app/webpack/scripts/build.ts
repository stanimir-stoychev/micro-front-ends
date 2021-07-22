/* eslint-disable no-console */
import { red } from 'chalk';
import webpack from 'webpack';

import buildWebpackConfigs from '../webpack.config';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (error: Error) => {
    throw error;
});

const appConfigs = buildWebpackConfigs('production');
const webpackCompiler = webpack(appConfigs);

webpackCompiler.run((error, stats) => {
    if (error) {
        console.error(red('Build failed'));
        throw error;
    }

    console.log(
        stats.toString({
            colors: true,
            entrypoints: false,
            modules: false,
        }),
    );
});

function onBuildFail() {
    process.exit();
}

process.on('SIGINT', onBuildFail);
process.on('SIGTERM', onBuildFail);
