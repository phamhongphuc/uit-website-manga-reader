import Router from 'koa-router';
import multer from 'koa-multer';
import axios from 'axios';
import FormData from 'form-data';
import { Image } from '../../server/database/database';

const router = new Router();
const upload = multer({ storage: multer.memoryStorage() });

router
    .post('/api/image', upload.single('image'), async ctx => {
        const data = new FormData();
        data.append('image', ctx.req.file.buffer);

        const imgur = await axios.post('https://api.imgur.com/3/image', data, {
            headers: {
                ...data.getHeaders(),
                // Authorization: 'Client-ID xxx',
            },
        });
        const image = await Image.create({
            name: ctx.req.file.originalname,
            url: imgur.data.data.link,
            chapterId: ctx.req.body.chapterId,
        });

        ctx.body = {
            id: image.id,
            name: image.name,
            url: image.url,
            chapterId: image.chapter.id,
        };
    })
    .patch('/api/image/:id', async ctx => {
        const image = Image.getById(ctx.params.id);
        if (image === undefined) {
            throw 'Hình ảnh này chưa được tạo';
        }
        await image.delete();
        ctx.body = { status: 'success' };
    });

export default router;
