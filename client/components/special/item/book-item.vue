<template>
    <div class="book-item">
        <div class="book-item-box" />
        <div class="book-item-image">
            <image- :source="item.image ? item.image.url : 'DrLSOhtXcAYJPI8'" />
        </div>
        <div class="book-item-text">
            <nuxt-link class="book-item-title" :to="`/manga/${item.id}`">
                {{ item.name }}
            </nuxt-link>
            <div class="book-item-tags">
                <span class="icon"></span>
                <template v-for="(genre, index) in item.genres">
                    <span v-if="index !== 0" :key="index * 2 + 1">,</span>
                    <nuxt-link :key="index * 2" to="/">
                        {{ genre.name }}
                    </nuxt-link>
                </template>
            </div>
            <div
                v-line-clamp:24="breakpointMap[breakpoint]"
                class="book-item-description"
            >
                <span class="icon"></span>
                <span class="book-item-description-content">
                    {{ item.description }}
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
</template>
<script>
import { mapState } from 'vuex';

export default {
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

    display: grid;
}
</style>
