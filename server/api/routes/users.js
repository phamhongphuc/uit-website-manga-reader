import Router from 'koa-router';

const router = new Router();

// Mock Users
const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/api/users', ctx => {
    ctx.body = users;
});

/* GET user by ID. */
router.get('/api/users/:id', ctx => {
    const id = parseInt(ctx.params.id, 10);
    if (id >= 0 && id < users.length) {
        ctx.body = users[id];
    } else {
        ctx.status = 404;
        ctx.body = 'Không tìm thấy';
    }
});

export default router;
