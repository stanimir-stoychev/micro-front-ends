import { blue, bold, green, magenta, red } from 'chalk';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';

import ENV from '../webpack/env';
import webpackConfig from '../webpack/webpack.config';
import webpackDevServerConfig from '../webpack/webpackDevServer.config';

import { getLocalIPs, logWebpackStat } from './helpers';

const { HOSTNAME, PORT } = ENV;
const { localIP } = getLocalIPs();
const compiler = Webpack(webpackConfig('development'));
const server = new WebpackDevServer(compiler, webpackDevServerConfig);

compiler.hooks.watchRun.tapPromise('Watch run', async () => {
    console.clear();
    console.log(magenta('Starting a new build...'));
});

compiler.hooks.failed.tap('Watch for failure', (error) => {
    console.clear();
    console.error(red('Failed to compile!'));
    console.error(red(error));
});

compiler.hooks.done.tapPromise('On done', async (stats) => {
    const { errors, warnings } = stats.toJson();
    console.clear();

    if (errors.length) {
        console.log(red('Failed compilation!'));
        errors.forEach(logWebpackStat('error'));
    } else {
        console.log(green('Successfully compiled!'));

        if (localIP) {
            console.log('\n', '\t', bold('You can access the app at:'));
            ['localhost', localIP].forEach((ip) => {
                console.log('\t', `${blue('http://')}${green(ip)}:${red(PORT)}/`);
            });
        }
    }

    warnings.forEach(logWebpackStat('warn'));
});

server.listen(PORT, HOSTNAME, (error) => {
    if (error) {
        console.error(red('Failed to start Webpack Dev Server'));
        console.error(red(error));
        return;
    }

    openBrowser(encodeURI(`http://localhost:${PORT}`));
});
