/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Koa from 'koa';
import { Nuxt, Builder } from 'nuxt';
import database from './database/database';
import routes from './api/_routers';
import middleware from './api/_middleware';
import config from '../nuxt.config';

config.dev = process.env.NODE_ENV === 'development';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

(async function() {
    const app = new Koa();

    await database();
    middleware(app);
    routes(app);

    const nuxt = new Nuxt(config);

    // if (config.dev) {
    //     const builder = new Builder(nuxt);
    //     await builder.build();
    // }

    app.use(ctx => {
        ctx.status = 200;
        ctx.respond = false;
        ctx.req.ctx = ctx;
        nuxt.render(ctx.req, ctx.res);
    });

    app.listen(PORT, HOST, () => {
        console.log(`Server is running on port ${PORT}!`);
    });
})();
