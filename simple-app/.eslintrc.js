const path = require('path');
const root = path.resolve(__dirname, './');

module.exports = {
    root: true,
    extends: [
        'airbnb-typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        project: `${root}/tsconfig.json`,
        sourceType: 'module',
    },
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'react/jsx-indent': ['on', 4],
    },
    overrides: [
        {
            files: ['webpack/*'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
};
