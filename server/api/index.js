import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import cors from '@koa/cors';

import database from '../database/database';

import usersRouter from './routes/users';
import chapterRouter from './routes/chapter';
import genreRouter from './routes/genre';
import imageRouter from './routes/image';
import mangaRouter from './routes/manga';

(async function() {
    await database();

    const app = new koa();

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
            console.log(err);
            ctx.body = err;
        }
    });

    app.use(usersRouter.routes());
    app.use(chapterRouter.routes());
    app.use(genreRouter.routes());
    app.use(imageRouter.routes());
    app.use(mangaRouter.routes());

    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000!');
    });
})();
