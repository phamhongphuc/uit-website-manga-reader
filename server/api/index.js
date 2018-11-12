/* eslint-disable no-console */
import Koa from 'koa';
import { Nuxt, Builder } from 'nuxt';
import database from '../database/database';
import routes from './_routers';
import middleware from './_middleware';
import config from '../../nuxt.config';

config.dev = process.env.NODE_ENV === 'development';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

(async function() {
    const app = new Koa();

    await database();
    middleware(app);
    routes(app);

    const nuxt = new Nuxt(config);
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    } else {
        // production
        app.use(nuxt.render);
    }

    app.listen(PORT, HOST, () => {
        console.log(`Server is running on port ${PORT}!`);
    });
})();
