<template>
    <div id="ranking">
        <h4 class="text-bold px-3">
            Ranking
        </h4>
        <b-tabs class="text-medium m-2">
            <b-tab
                title="Day"
                active
            >
                <book-horizontal-
                    v-for="(item, index) in images"
                    :key="index"
                    :item="item"
                />
            </b-tab>
            <b-tab title="Week"/>
            <b-tab title="Month"/>
        </b-tabs>
    </div>
</template>
<script>
import bookHorizontal from '~/components/custom/book-horizontal.vue';

export default {
    components: {
        'book-horizontal-': bookHorizontal,
    },
    data() {
        return {
            images: [
                {
                    img: 'DrMpC5CXcAApzT7',
                    name: `Kage no Jitsuryokusha ni Naritakute!`,
                    top: 1,
                },
                {
                    img: 'DrLSOhtXcAYJPI8',
                    name: `Lazy Dungeon Master`,
                    top: 2,
                },
                {
                    img: `DrMqUOwXgAAQovd`,
                    name: 'Isekai Nonbiri Nouka',
                },
            ],
            ROOT_API: process.env.ROOT_API,
        };
    },
};
</script>
<style lang="scss">
#ranking {
    .nav-tabs {
        border: none;
    }

    .nav-link {
        border-width: 0 0 3px;
        border-style: solid;
        border-bottom-color: transparent;
        font-size: 1.2em;
        padding: 0 0.5rem 0.2rem;
        color: $body-color;

        &.active {
            border-bottom-color: $body-color;
            color: $body-color;
            background: transparent;
        }

        &:not(.active):hover {
            border-bottom-color: rgba($body-color, 0.25);
        }
    }
}
</style>
