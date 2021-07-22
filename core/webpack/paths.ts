import path from 'path';

const root = path.resolve(__dirname, '..');

export default {
    BUILD: `${root}/build`,
    DOT_ENV: `${root}/.env`,
    PUBLIC: `${root}/public`,
    SRC: `${root}/src`,
    SRC_INDEX: `${root}/src/index.ts`,
};
