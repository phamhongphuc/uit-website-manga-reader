<template>
    <div>
        <h4 class="text-bold px-3">Latest Manga Updates</h4>
        <div class="row m-0 align-items-stretch">
            <book-vertical-
                v-for="(item, index) in images"
                :key="index"
                :item="item"
                class="col-12 col-lg-8 col-xl-6"
            />
        </div>
    </div>
</template>
<script>
import bookVertical from '~/components/custom/book-vertical.vue';

export default {
    components: {
        'book-vertical-': bookVertical,
    },
    data() {
        return {
            images: [
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
            ],
        };
    },
};
</script>
