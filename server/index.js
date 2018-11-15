/* eslint-disable no-process-exit */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Koa from 'koa';
import { Nuxt, Builder, Generator } from 'nuxt';
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

    app.use(ctx => {
        ctx.status = 200;
        ctx.respond = false;
        ctx.req.ctx = ctx;
        nuxt.render(ctx.req, ctx.res);
    });

    const server = app.listen(PORT, HOST, async () => {
        console.log(`Server is running on port ${PORT}!`);

        if (process.env.NODE_ENV === 'generation') {
            const builder = new Builder(nuxt);
            const generate = new Generator(nuxt, builder);
            try {
                await generate.generate();
                console.log('Nuxt generated');
                process.exit(0);
            } catch (e) {
                console.log(e);
                process.exit(1);
            }
        }
    });
})();
