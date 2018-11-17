const isDevelopment = process.env.NODE_ENV === 'development';
const isGeneration = process.env.NODE_ENV === 'generation';
const DATA_API = isDevelopment || isGeneration ? 'http://localhost:3000' : '';
const REDIRECT_API = isDevelopment ? 'http://localhost:3000' : '';

module.exports = {
    head: {
        title: 'Auth Routes',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                content: 'Auth Routes example',
            },
        ],
        link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Pacifico' }],
    },
    srcDir: 'client/',
    server: {
        port: 8080,
    },
    env: { DATA_API, REDIRECT_API },
    css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],
    modules: [
        '@nuxtjs/apollo',
        ['bootstrap-vue/nuxt', { css: false }],
        [
            'nuxt-sass-resources-loader',
            [
                'assets/scss/before/_before.scss',
                'bootstrap/scss/_functions.scss',
                'bootstrap/scss/_variables.scss',
                'bootstrap/scss/_mixins.scss',
            ],
        ],
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: `${DATA_API}/api/graphql`,
            },
        },
    },
    build: {
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }
        },
    },
    generate: {
        routes: (() => {
            return [];
        })(),
    },
};
