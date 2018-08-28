// import bodyParser from 'body-parser';
// import session from 'express-session';

export default {
    head: {
        title: 'Auth Routes',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', content: 'Auth Routes example' },
        ],
    },
    port: 8080,
    css: ['~/assets/css/main.css'],
    build: {
        // watch: ['api'],
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
    // serverMiddleware: [
    //     bodyParser.json(),
    //     session({
    //         secret: 'super-secret-key',
    //         resave: false,
    //         saveUninitialized: false,
    //         cookie: { maxAge: 60000 },
    //     }),
    //     '~/api',
    // ],
};
