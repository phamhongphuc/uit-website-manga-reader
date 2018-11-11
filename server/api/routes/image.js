import multer from 'koa-multer';
import Router from 'koa-router';
import { Image } from '../../database/model';

const router = new Router();
const upload = multer({ storage: multer.memoryStorage() });

router
    .post('/api/image', upload.single('image'), async ctx => {
        const image = await Image.create({
            name: ctx.req.file.originalname,
            imageBuffer: ctx.req.file.buffer,
            chapterId: ctx.req.body.chapterId,
        });
        ctx.body = {
            id: image.id,
            name: image.name,
            url: image.url,
        };
        if (image.chapter !== null) {
            ctx.body.chapterId = image.chapter.id;
        }
    })
    .delete('/api/image/:id', async ctx => {
        const image = Image.getById(ctx.params.id);
        if (image === undefined) {
            throw new Error('Hình ảnh này chưa được tạo');
        }
        await image.delete();
        ctx.body = { status: 'success' };
    });

export default router;
