import Router from 'koa-router';
import { Manga } from '../../server/database/database';

const router = new Router();

router
    .post('/api/manga', async ctx => {
        const manga = await Manga.create(ctx.request.body);
        ctx.body = {
            id: manga.id,
            name: manga.name,
            associatedNames: manga.associatedNames.map(a => a),
            type: manga.type,
            status: manga.status,
            publishedFrom: manga.publishedFrom,
            publishedTo: manga.publishedTo,
            genres: manga.genres.map(genre => genre.name),
            authors: manga.authors,
            description: manga.description,
            imageId: manga.image.id,
        };
    })
    .patch('/api/manga/:id', async ctx => {
        const oldManga = Manga.getById(ctx.params.id);
        if (oldManga === undefined) {
            throw 'Manga này chưa được tạo';
        }
        const manga = await oldManga.update(ctx.request.body);
        ctx.body = {
            id: manga.id,
            name: manga.name,
            associatedNames: manga.associatedNames.map(a => a),
            type: manga.type,
            status: manga.status,
            publishedFrom: manga.publishedFrom,
            publishedTo: manga.publishedTo,
            genres: manga.genres.map(genre => genre.name),
            authors: manga.authors,
            description: manga.description,
            imageId: manga.image.id,
        };
    });

//delete viết sau

export default router;
