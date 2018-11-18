const config = {
    env: {
        node: true,
        browser: true,
        es6: true,
        mocha: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'standard',
        'plugin:vue/recommended',
        'plugin:node/recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
        'plugin:prettier/recommended',
        'prettier/vue',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    plugins: ['standard', 'vue', 'import', 'node', 'markdown'],
    settings: {
        'import/resolver': {
            'babel-plugin-root-import': {
                rootPathPrefix: '~',
                rootPathSuffix: 'client',
            },
        },
    },
    rules: {
        'eol-last': 'error',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'no-console': 'warn',
        'no-lonely-if': 'error',
        'prefer-const': 'error',
        camelcase: 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'node/no-unsupported-features/es-syntax': 'off',
        'import/prefer-default-export': 'off',
        'vue/html-indent': ['error', 4],
    },
};

if (process.env.NODE_ENV == 'development') {
    config.plugins.push('only-warn');
}

module.exports = config;
