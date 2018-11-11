import Router from 'koa-router';

const router = new Router();

router.get('/api/redirect/twitter/image/:id', async ctx => {
    ctx.redirect(`https://pbs.twimg.com/media/${ctx.params.id}?format=jpg`);
});

export default router;
