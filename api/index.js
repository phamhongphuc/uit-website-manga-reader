import koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import database from '../server/database/database';
import usersRouter from './routes/users';
import genreRouter from './routes/genre';
import imageRouter from './routes/image';

(async function() {
    await database();

    const app = new koa();

    app.use(
        cors({
            origin: 'http://localhost:8080',
        }),
    );
    app.use(bodyParser());

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.body = err;
        }
    });

    app.use(usersRouter.routes());
    app.use(genreRouter.routes());
    app.use(imageRouter.routes());

    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000!');
    });
})();
