import Router from 'koa-router';
import { db, Genre } from '../../database/database';

const router = new Router();

router
    .get('/api/genres', async ctx => {
        //get danh sách thể loại
        const genres = db.realm.objects('Genre');
        ctx.body = genres.map(genre => ({
            name: genre.name,
            description: genre.description,
        }));
    })
    .get('/api/genre/:name', async ctx => {
        //get danh sách truyện dựa theo tên thể loại
        const genre = Genre.getByName(ctx.params.name);
        ctx.body = {
            name: genre.name,
            description: genre.description,
            mangas: genre.mangas.map(manga => ({
                id: manga.id,
                name: manga.name,
                genres: manga.genres.map(genre => genre.name),
                description: manga.description,
                imageId: manga.image.id,
            })),
        };
    })
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
