import Router from 'koa-router';
import { Manga } from '../../server/database/database';

const router = new Router();

router.post('/api/manga/create', async ctx => {
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
});

router.post('/api/manga/update', async ctx => {
    const req = ctx.request.body;
    const oldManga = Manga.getById(req.id);
    if (oldManga === undefined) {
        throw 'Manga này chưa được tạo';
    }
    const manga = await oldManga.update(req);
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
