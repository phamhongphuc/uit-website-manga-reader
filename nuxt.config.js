const config = {
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
    },
    srcDir: 'client/',
    server: {
        port: 8080,
    },
    env: {
        ROOT_API: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
    },
    css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],
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
    modules: [
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
};

export default config;
