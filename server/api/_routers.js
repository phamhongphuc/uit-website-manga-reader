// import Koa from 'koa';
import usersRouter from './routes/users';
import chapterRouter from './routes/chapter';
import genreRouter from './routes/genre';
import imageRouter from './routes/image';
import mangaRouter from './routes/manga';

/**
 * @typedef {import("koa")} Koa
 * @param {Koa} app
 */
export default function(app) {
    const routers = [
        usersRouter,
        chapterRouter,
        genreRouter,
        imageRouter,
        mangaRouter,
    ];
    routers.forEach(router => app.use(router.routes()));
}
