/* eslint-disable no-console */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import cors from '@koa/cors';

import database from '../database/database';

import usersRouter from './routes/users';
import chapterRouter from './routes/chapter';
import genreRouter from './routes/genre';
import imageRouter from './routes/image';
import mangaRouter from './routes/manga';
import redirectRouter from './routes/redirect';

export default (async function() {
    await database();

    const app = new Koa();

    app.use(
        cors({
            origin: 'http://localhost:8080',
        }),
    );
    app.use(bodyParser());
    app.use(
        session(
            {
                secret: 'super-secret-key',
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 60000 },
            },
            app,
        ),
    );

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            console.error(err);
            ctx.body = err;
        }
    });

    app.use(usersRouter.routes());
    app.use(chapterRouter.routes());
    app.use(genreRouter.routes());
    app.use(imageRouter.routes());
    app.use(mangaRouter.routes());

    app.use(redirectRouter.routes());

    if (!process.server) return app.callback;

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
    });
})();
