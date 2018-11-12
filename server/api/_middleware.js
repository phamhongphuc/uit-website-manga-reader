import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import cors from '@koa/cors';

/**
 * @typedef {import("koa")} Koa
 * @param {Koa} app
 */
export default function(app) {
    if (!process.server) {
        app.use(cors({ origin: 'http://localhost:8080' }));
    }
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
            // eslint-disable-next-line no-console
            console.error(err);
            ctx.body = err;
        }
    });
}
