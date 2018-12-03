<template>
    <div class="book-item ratio-box">
        <div>
            <div class="book-item-box" />
            <div class="book-item-image">
                <image- redirect :source="item.image.url" />
            </div>
            <div class="book-item-text">
                <nuxt-link class="book-item-title" to="/">
                    {{ item.name }}
                </nuxt-link>
                <div class="book-item-tags">
                    <span class="icon"></span>
                    <template v-for="(tag, index) in tags">
                        <span v-if="index !== 0" :key="index * 2 + 1">,</span>
                        <nuxt-link :key="index * 2" to="/">{{ tag }}</nuxt-link>
                    </template>
                </div>
                <div
                    v-line-clamp:24="breakpointMap[breakpoint]"
                    class="book-item-description"
                >
                    <span class="icon"></span>
                    <span class="book-item-description-content">
                        {{ content }}
                    </span>
                </div>
                <nuxt-link to="/" class="book-item-chapter">
                    <span class="icon"></span>
                    <span>Chapter 1</span>
                    <span class="book-item-chapter-name">
                        The love love love love
                    </span>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    components: {
        ...'~/components/utilities/ratio-box.vue',
        ...'~/components/utilities/image.vue',
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            breakpointMap: {
                xs: 2,
                sm: 3,
                md: 3,
                lg: 4,
                xl: 4,
            },
            tags: ['Action', 'Yuri', 'Shoujo Ai'],
            content:
                'In the city of Ergastulum, a shady ville filled with made men and petty thieves, whores on the make and cops on the take, there are some deeds too dirty for even its jaded inhabitants to touch. Enter the “Handymen,” Nic and Worick, who take care of the jobs no one else will handle. Until the day when a cop they know on the force requests their help in taking down a new gang muscling in on the territory of a top Mafia family. It seems like business (and mayhem) as usual, but the Handymen are about to find that this job is a lot more than they bargained for.',
        };
    },
    computed: {
        ...mapState({
            breakpoint: state => state.style.breakpoint,
        }),
    },
};
</script>
<style lang="scss">
.book-item {
    @include book-item-grid(2);
    @include book-item-grid-up(3, sm);
    @include book-item-grid-up(4, lg);
}
</style>
