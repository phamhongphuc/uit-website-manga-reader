import Router from 'koa-router';
import { Chapter } from '../../server/database/database';

const router = new Router();

router
    .get('/api/chapter/:id', async ctx => {
        //get 1 chi tiết chương
        const chapter = Chapter.getById(ctx.params.id);
        ctx.body = {
            id: chapter.id,
            name: chapter.name,
            date: chapter.date,
            images: chapter.images.map(image => ({
                id: image.id,
                name: image.name,
                url: image.url,
            })),
        };
    })
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
