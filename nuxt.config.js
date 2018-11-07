const config = {
    head: {
        title: 'Auth Routes',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', content: 'Auth Routes example' },
        ],
    },
    server: {
        port: 8080,
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
    modules: [['bootstrap-vue/nuxt', { css: false }]],
};

if (process.env.NODE_ENV !== 'development') {
    config.serverMiddleware = ['~/server/api'];
}

export default config;
