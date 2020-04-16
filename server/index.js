/* eslint-disable no-process-exit */
/* eslint-disable no-console */
import Koa from 'koa';
import { Nuxt, Builder, Generator } from 'nuxt';
import database from './database/database';
import middleware from './api/_middleware';
import graphql from './graphql/_graphql';

import config from '../nuxt.config';

config.dev = process.env.NODE_ENV === 'development';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

(async function() {
    const app = new Koa();

    await database();
    middleware(app);
    graphql(app);

    const nuxt = new Nuxt(config);

    if (['development', 'generation'].indexOf(process.env.NODE_ENV) === -1) {
        // Render every route with Nuxt.js
        app.use(ctx => {
            ctx.status = 200;
            ctx.respond = false;
            ctx.req.ctx = ctx;
            nuxt.render(ctx.req, ctx.res);
        });
    }

    app.listen(PORT, HOST, async () => {
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
