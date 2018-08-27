import Router from 'koa-router';
import { Chapter } from '../../server/database/database';

const router = new Router();

router.post('/api/chapter/create', async ctx => {
    const chapter = await Chapter.create(ctx.request.body);
    ctx.body = {
        id: chapter.id,
        name: chapter.name,
        date: chapter.date,
        mangaId: chapter.manga.id,
        isPublished: chapter.isPublished,
    };
});

router.post('/api/chapter/update', async ctx => {
    const req = ctx.request.body;
    const oldChapter = Chapter.getById(req.id);
    if (oldChapter === undefined) {
        throw 'Chapter này chưa được tạo';
    }
    const chapter = await oldChapter.update(req);
    ctx.body = {
        id: chapter.id,
        name: chapter.name,
        date: chapter.date,
        mangaId: chapter.manga.id,
        isPublished: chapter.isPublished,
    };
});

export default router;
