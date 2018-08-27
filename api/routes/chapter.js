import Router from 'koa-router';
import { Chapter } from '../../server/database/database';

const router = new Router();

router
    .post('/api/chapter', async ctx => {
        const chapter = await Chapter.create(ctx.request.body);
        ctx.body = {
            id: chapter.id,
            name: chapter.name,
            date: chapter.date,
            mangaId: chapter.manga.id,
            isPublished: chapter.isPublished,
        };
    })
    .patch('/api/chapter/:id', async ctx => {
        const oldChapter = Chapter.getById(ctx.params.id);
        if (oldChapter === undefined) {
            throw 'Chapter này chưa được tạo';
        }
        const chapter = await oldChapter.update(ctx.request.body);
        ctx.body = {
            id: chapter.id,
            name: chapter.name,
            date: chapter.date,
            mangaId: chapter.manga.id,
            isPublished: chapter.isPublished,
        };
    });

export default router;
