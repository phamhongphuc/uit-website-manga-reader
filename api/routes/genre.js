import Router from 'koa-router';
import { Genre } from '../../server/database/database';

const router = new Router();

router
    .post('/api/genre', async ctx => {
        const genre = await Genre.create(ctx.request.body);
        ctx.body = { name: genre.name, description: genre.description };
    })
    .patch('/api/genre/:name', async ctx => {
        const oldGenre = Genre.getByName(ctx.params.name);
        if (oldGenre === undefined) {
            throw 'Thể loại này chưa được tạo';
        }
        const genre = await oldGenre.update(ctx.request.body);
        ctx.body = { name: genre.name, description: genre.description };
    })
    .delete('/api/genre/:name', async ctx => {
        const genre = Genre.getByName(ctx.params.name);
        if (genre === undefined) {
            throw 'Thể loại này chưa được tạo';
        }
        await genre.delete();
        ctx.body = { status: 'success' };
    });

export default router;
