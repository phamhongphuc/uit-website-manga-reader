import Router from 'koa-router';

const router = new Router();

router.get('/api/redirect/twitter/image/:id', async ctx => {
    ctx.redirect(`https://pbs.twimg.com/media/${ctx.params.id}?format=jpg`);
});

router.get('/api/dev/mangas', ctx => {
    ctx.body = [
        {
            img: 'DrMpC5CXcAApzT7',
            name: `Kage no Jitsuryokusha ni Naritakute!`,
        },
        {
            img: 'DrLSOhtXcAYJPI8',
            // img: 'DrYmEM1U0AMdJS-',
            name: `Lazy Dungeon Master`,
        },
        {
            img: `DrMqUOwXgAAQovd`,
            name: 'Isekai Nonbiri Nouka',
        },
        {
            img: `DrEcwc4W4AI7UPh`,
            name: `Gochuumon wa Usagi desu ka?`,
        },
        {
            img: `DrEbaS9X4AAN4j3`,
            name: `Saikyou Doushi ga Omiai shita Kekka`,
        },
        {
            img: `DrASKcjWsAA4Dji`,
            name: `Yuujin Character wa Taihen desu ka?`,
        },
        {
            img: `Dq9Dz60XQAA2KPq`,
            name: `Majo no Tabitabi`,
        },
        {
            img: `Dq9C6GvWsAM3jDD`,
            name: `Slime Taoshite 300-nen`,
        },
        {
            img: `DqaHFAgX4AAipnm`,
            name: `Yome-Yome Immigration`,
        },
    ];
});

export default router;
