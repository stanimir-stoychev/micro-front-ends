/* eslint-disable no-console */
import { blue, bold, green, red } from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import buildDevServerConfig from '../webpackDevServer.config';
import buildWebpackConfig from '../webpack.config';
import { getLocalIPs, openBrowser } from '../network';
import ENV from '../env';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (error: Error) => {
    throw error;
});

const { localIP } = getLocalIPs();
const appConfig = buildWebpackConfig('development');
const webpackCompiler = webpack(appConfig);

webpackCompiler.hooks.watchRun.tapPromise('Watch run', async () => {
    console.clear();
    console.log(blue('Starting a new build...'));
});

webpackCompiler.hooks.failed.tap('Watch for failure', (error) => {
    console.clear();
    console.error('Failed to compile!');
    console.error(error);
});

webpackCompiler.hooks.done.tapPromise('On done', async (stats) => {
    const { errors, warnings } = stats.toJson();

    console.clear();

    if (errors.length) {
        console.log(red('Failed compilation!'));
        errors.forEach(console.error);
    } else {
        console.log(green('Successfully compiled!'));

        if (localIP) {
            console.log('\n', '\t', bold('You can access the app at:'));
            ['localhost', localIP].forEach((ip) => {
                console.log('\t', `${blue('http://')}${green(ip)}:${red(port)}/`);
            });
        }
    }

    warnings.forEach(console.warn);
});

const { host = ENV.HOST, port = ENV.PORT, ...restOfDevServerConfig } = buildDevServerConfig();
const webpackDevServer = new WebpackDevServer(webpackCompiler, restOfDevServerConfig);

webpackDevServer.listen(port, host, (error) => {
    if (error) {
        console.error(red('Failed to start Webpack Dev Server'));
        console.error(error);
        return;
    }

    openBrowser(encodeURI(`http://localhost:${port}`));
});

function onCloseWebpackDevServer() {
    webpackDevServer.close();
    process.exit();
}

process.on('SIGINT', onCloseWebpackDevServer);
process.on('SIGTERM', onCloseWebpackDevServer);
